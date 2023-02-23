import { config, KMS } from 'aws-sdk';
import * as fcl from '@onflow/fcl';
import * as t from '@onflow/types';
import { Authorizer, TransactionStatusObject } from '../helpers';
import { isEmpty, isNotEmpty } from 'class-validator';
import { UnhandledError } from '../errors';
import { ec as EC } from 'elliptic';
import { template as createAccount } from '@onflow/six-create-account';
import SHA3 from 'sha3';
import { readFile } from 'fs/promises';
import { join, resolve } from 'path';
import { createHash } from 'crypto';

const ec: EC = new EC('secp256k1');
const p256Ec: EC = new EC('p256');

export type HashAlgorithm = 'sha2' | 'sha3';

export class FclError extends Error {
    public constructor(
        public txResponse: any,
        public error: any,
        public message: string
    ) {
        super(message);
    }
}

export class FclService {
    private adminPrivateKey: string;
    private clientPrivateKey: string;

    constructor() {
        config.update({ region: 'ap-northeast-1' });
    }

    async getAccount(addr: string) {
        const { account } = await fcl.send([fcl.getAccount(addr)]);
        return account;
    }

    authorizeAdmin(keySlot: number, authorizer: Authorizer) {
        return this.createAuthz(keySlot, authorizer, ec, 'sha3');
    }

    authorizeClient(keySlot: number, authorizer: Authorizer) {
        // console.log("authorizeMinter1");
        return this.createAuthz(keySlot, authorizer, ec, 'sha2');
    }

    private signWithKey(
        privateKey: string,
        msg: string,
        ecAlg: EC,
        hashAlg: HashAlgorithm
    ) {
        const key = ecAlg.keyFromPrivate(Buffer.from(privateKey, 'hex'));
        const sig = key.sign(this.hashMsg(msg, hashAlg));
        const n = 32;
        const r = sig.r.toArrayLike(Buffer, 'be', n);
        const s = sig.s.toArrayLike(Buffer, 'be', n);
        return Buffer.concat([r, s]).toString('hex');
    }

    private hashMsg(msg: string, alg: HashAlgorithm) {
        const sha = alg === 'sha2' ? createHash('sha256') : new SHA3(256);
        sha.update(Buffer.from(msg, 'hex'));
        return sha.digest();
    }

    async sendTx({
        transaction,
        args,
        proposer,
        authorizations,
        payer
    }): Promise<any> {
        let response: TransactionStatusObject = null;
        try {
            response = await fcl.send([
                fcl.transaction`
        ${transaction}
      `,
                fcl.args(args),
                fcl.proposer(proposer),
                fcl.authorizations([authorizations]),
                fcl.payer(payer),
                fcl.limit(9999)
            ]);
            return await fcl.tx(response).onceSealed();
        } catch (e) {
            if (isNotEmpty(response)) {
                throw new FclError(response, e, 'Transaction failed');
            } else {
                throw e;
            }
        }
    }

    async mint(
        metaDataUrlHash: string,
        description: string,
        title: string,
        minterAddress: string,
        keySlot: number,
        thumbnailHash: string,
        thumbnailMimeType: string
    ) {
        await this.initializePrivateKeys();

        const mintAuthorization = this.authorizeAdmin(keySlot, {
            address: process.env.FLOW_ADMIN_ADDRESS,
            privateKey: this.adminPrivateKey
        });

        const payerAuthorization = this.authorizeAdmin(keySlot, {
            address: process.env.FLOW_ADMIN_ADDRESS,
            privateKey: this.adminPrivateKey
        });

        const proposerAuthorization = this.authorizeAdmin(keySlot, {
            address: process.env.FLOW_ADMIN_ADDRESS,
            privateKey: this.adminPrivateKey
        });

        let transaction = '';
        const args = [];

        transaction = await readFile(join(__dirname, 'transactions/mint.cdc'), {
            encoding: 'utf8'
        });
        args.push(fcl.arg(metaDataUrlHash, t.String));
        args.push(fcl.arg(description, t.String));
        args.push(fcl.arg(title, t.String));
        args.push(fcl.arg(minterAddress, t.Address));
        args.push(fcl.arg(thumbnailHash, t.String));
        args.push(fcl.arg(thumbnailMimeType, t.String));

        //  Logger.log('transaction for mint\n',transaction);

        const result = await this.sendTx({
            transaction,
            args,
            authorizations: mintAuthorization,
            payer: payerAuthorization,
            proposer: proposerAuthorization
        });
        return result;
    }

    async decryptPrivateKey(encryptedKey: string) {
        // Decrypt code should run once and variables stored outside of the
        // function handler so that these are decrypted once per container
        const kms = new KMS();
        try {
            const req = {
                CiphertextBlob: Buffer.from(encryptedKey, 'base64'),
                EncryptionContext: { LambdaFunctionName: 'certifily_creds' }
            };
            const data = await kms.decrypt(req).promise();
            const decrypted = data.Plaintext.toString('ascii');
            return decrypted;
        } catch (err) {
            console.error('Failed to decrypt private key', err);
            throw new UnhandledError(err);
        }
    }

    async createUser(keySlot: number): Promise<TransactionStatusObject> {
        await this.initializePrivateKeys();
        const response = await fcl.send([
            createAccount({
                proposer: this.authorizeAdmin(keySlot, {
                    address: process.env.FLOW_ADMIN_ADDRESS,
                    privateKey: this.adminPrivateKey
                }),
                authorization: this.authorizeAdmin(keySlot, {
                    address: process.env.FLOW_ADMIN_ADDRESS,
                    privateKey: this.adminPrivateKey
                }),
                payer: this.authorizeAdmin(keySlot, {
                    address: process.env.FLOW_ADMIN_ADDRESS,
                    privateKey: this.adminPrivateKey
                }),
                publicKey: process.env.CLIENT_PUBLIC_KEY,
                signatureAlgorithm: '2',
                hashAlgorithm: '1',
                weight: '1000.0'
            }),
            fcl.limit(9999)
        ]);
        const finalResponse: unknown = await fcl.tx(response).onceSealed();
        return finalResponse as TransactionStatusObject;
    }

    async setupAccount(
        keySlot: number,
        address: string
    ): Promise<TransactionStatusObject> {
        await this.initializePrivateKeys();
        console.log('Script path', resolve('../transactions/create_setup.cdc'));
        const transaction = await readFile(
            resolve('../transactions/create_setup.cdc'),
            {
                encoding: 'utf8'
            }
        );
        // const response = await fcl.mutate({
        //     cadence: transaction,
        //     proposer: this.authorizeMinter(keySlot, {
        //         address,
        //         privateKey: this.clientPrivateKey
        //     }),
        //     authorization: this.authorizeMinter(keySlot, {
        //         address,
        //         privateKey: this.clientPrivateKey
        //     }),
        //     payer: this.authorizeMinter(keySlot, {
        //         address,
        //         privateKey: this.clientPrivateKey
        //     }),
        //     limit: 9999
        // });
        // const finalResponse = await fcl.tx(response).onceSealed();
        const response = await this.sendTx({
            transaction,
            args: [],
            authorizations: this.authorizeClient(keySlot, {
                address,
                privateKey: this.clientPrivateKey
            }),
            payer: this.authorizeClient(keySlot, {
                address,
                privateKey: this.clientPrivateKey
            }),
            proposer: this.authorizeClient(keySlot, {
                address,
                privateKey: this.clientPrivateKey
            })
        });
        return response;
    }

    public async transferFlowToken(
        keySlot: number,
        amount: number,
        address: string
    ) {
        await this.initializePrivateKeys();
        console.log('Script path', resolve('../transactions/transferflow.cdc'));
        const transaction = await readFile(
            resolve('../transactions/transferflow.cdc'),
            {
                encoding: 'utf8'
            }
        );
        const response = await this.sendTx({
            transaction,
            args: [
                fcl.arg(amount.toFixed(2), t.UFix64),
                fcl.arg(address, t.Address)
            ],
            authorizations: this.authorizeAdmin(keySlot, {
                address: process.env.FLOW_ADMIN_ADDRESS,
                privateKey: this.adminPrivateKey
            }),
            payer: this.authorizeAdmin(keySlot, {
                address: process.env.FLOW_ADMIN_ADDRESS,
                privateKey: this.adminPrivateKey
            }),
            proposer: this.authorizeAdmin(keySlot, {
                address: process.env.FLOW_ADMIN_ADDRESS,
                privateKey: this.adminPrivateKey
            })
        });
        return response;
    }

    private async initializePrivateKeys() {
        try {
            if (isEmpty(this.adminPrivateKey) || this.adminPrivateKey === '') {
                this.adminPrivateKey = await this.decryptPrivateKey(
                    process.env.ADMIN_AUTH_KEY
                );
            }
            if (
                isEmpty(this.clientPrivateKey) ||
                this.clientPrivateKey === ''
            ) {
                this.clientPrivateKey = await this.decryptPrivateKey(
                    process.env.CLIENT_AUTH_KEY
                );
            }
        } catch (e) {
            throw new UnhandledError(e);
        }
    }
    private;

    createAuthz(
        keySlot: number,
        authorizer: Authorizer,
        signAlg: EC,
        hashAlg: HashAlgorithm
    ) {
        return async (account: any = {}) => {
            const user = await this.getAccount(authorizer.address);
            const key = user.keys[keySlot];

            // Logger.log('Key', key);

            // console.log('Key', key);

            // const sign = this.signWithKey;
            const pk = authorizer.privateKey;

            return {
                ...account,
                tempId: `${user.address}-${key.index}`,
                addr: fcl.sansPrefix(user.address),
                keyId: Number(key.index),
                signingFunction: (signable) => {
                    return {
                        addr: fcl.withPrefix(user.address),
                        keyId: Number(key.index),
                        signature: this.signWithKey(
                            pk,
                            signable.message,
                            signAlg,
                            hashAlg
                        )
                    };
                }
            };
        };
    }
}

const fclService = new FclService();
export default fclService;