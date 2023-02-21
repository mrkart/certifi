import {
    Column,
    Entity,
    Index,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn,
    RelationId
} from 'typeorm';
import { CertTemplate } from './CertTemplate';
import { User } from './User';
import { Org } from './Org';
import { CertData } from './CertData';
import { AssetOrg } from './AssetOrg';

@Index('Certificate_fk0', ['orgId'], {})
@Index('Certificate_fk1', ['userId'], {})
@Index('Certificate_fk2', ['certDataId'], {})
@Index('Certificate_fk3', ['signerPreparerId'], {})
@Index('Certificate_fk4', ['signerVerifierId'], {})
@Index('Certificate_fk5', ['signerIssuerId'], {})
@Index('Certificate_fk6', ['certTemplateId'], {})
@Index('Certificate_fk7', ['certificateFilePath'], {})
@Entity('certificate')
export class Certificate {
    @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
    id: number;

    @Column('int', { name: 'org_id' })
    orgId: number;

    @Column('int', { name: 'user_id' })
    userId: number;

    @Column('int', { name: 'cert_data_id' })
    certDataId: number;

    @Column('int', { name: 'signer_preparer_id' })
    signerPreparerId: number;

    @Column('int', { name: 'signer_verifier_id' })
    signerVerifierId: number;

    @Column('int', { name: 'signer_issuer_id' })
    signerIssuerId: number;

    @Column('int', { name: 'cert_template_id' })
    certTemplateId: number;

    @Column('int', { name: 'certificate_file_path' })
    certificateFilePath: number;

    @Column('varchar', { name: 'nft_hash', length: 255 })
    nftHash: string;

    @Column('varchar', { name: 'nft_data', length: 255 })
    nftData: string;

    @Column('timestamp', {
        name: 'datetime_created',
        default: () => 'CURRENT_TIMESTAMP'
    })
    datetimeCreated: Date;

    @Column('timestamp', {
        name: 'datetime_updated',
        default: () => 'CURRENT_TIMESTAMP',
        onUpdate: 'CURRENT_TIMESTAMP'
    })
    datetimeUpdated: Date;

    @ManyToOne(
        () => CertTemplate,
        (certTemplate) => certTemplate.certificates,
        {
            onDelete: 'RESTRICT',
            onUpdate: 'RESTRICT'
        }
    )
    @JoinColumn([{ name: 'cert_template_id', referencedColumnName: 'id' }])
    certTemplate: CertTemplate;

    @ManyToOne(() => User, (user) => user.certificates, {
        onDelete: 'RESTRICT',
        onUpdate: 'RESTRICT'
    })
    @JoinColumn([{ name: 'signer_issuer_id', referencedColumnName: 'id' }])
    signerIssuer: User;

    @ManyToOne(() => Org, (org) => org.certificates, {
        onDelete: 'RESTRICT',
        onUpdate: 'RESTRICT'
    })
    @JoinColumn([{ name: 'org_id', referencedColumnName: 'id' }])
    org: Org;

    @ManyToOne(() => User, (user) => user.certificates2, {
        onDelete: 'RESTRICT',
        onUpdate: 'RESTRICT'
    })
    @JoinColumn([{ name: 'user_id', referencedColumnName: 'id' }])
    user: User;

    @ManyToOne(() => CertData, (certData) => certData.certificates, {
        onDelete: 'RESTRICT',
        onUpdate: 'RESTRICT'
    })
    @JoinColumn([{ name: 'cert_data_id', referencedColumnName: 'id' }])
    certData: CertData;

    @ManyToOne(() => User, (user) => user.certificates3, {
        onDelete: 'RESTRICT',
        onUpdate: 'RESTRICT'
    })
    @JoinColumn([{ name: 'signer_verifier_id', referencedColumnName: 'id' }])
    signerVerifier: User;

    @ManyToOne(() => User, (user) => user.certificates4, {
        onDelete: 'RESTRICT',
        onUpdate: 'RESTRICT'
    })
    @JoinColumn([{ name: 'signer_preparer_id', referencedColumnName: 'id' }])
    signerPreparer: User;

    @ManyToOne(() => AssetOrg, (assetOrg) => assetOrg.certificates, {
        onDelete: 'RESTRICT',
        onUpdate: 'RESTRICT'
    })
    @JoinColumn([{ name: 'certificate_file_path', referencedColumnName: 'id' }])
    certificateFilePath2: AssetOrg;
}
