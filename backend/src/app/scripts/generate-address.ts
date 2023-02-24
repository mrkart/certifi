import { isEmpty } from 'class-validator';
import { config } from 'dotenv';
import { join } from 'path';
import { exit } from 'process';
config({ path: join(__dirname, '../../../.env') });
import '../config/flow';
import { UnhandledError } from '../errors';
import { TransactionEvent, AccountCreatedEventData } from '../helpers';
import { FclService } from '../services';

async function main() {
    const fclService = new FclService();
    const userTx = await fclService.createUser(0);
    const flowAccountCreatedEvt: TransactionEvent<AccountCreatedEventData> =
        userTx.events.find(
            (evt) => evt.type === 'flow.AccountCreated'
        ) as TransactionEvent<AccountCreatedEventData>;
    if (isEmpty(flowAccountCreatedEvt)) {
        throw new UnhandledError(
            new Error(
                'User creation tx response ' +
                    'did not contain event "flow.AccountCreated"'
            )
        );
    }
    const { address } = flowAccountCreatedEvt.data;
    return address;
}

main()
    .then((address) => {
        console.log('✓ Account created %s', address);
        exit(0);
    })
    .catch((e) => {
        console.error(e);
        exit(1);
    });
