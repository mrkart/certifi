import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { AssetOrg } from './AssetOrg';
import { CertData } from './CertData';
import { Certificate } from './Certificate';
import { Org } from './Org';
import { OrgRoles } from './OrgRoles';
import { SlotHasUser } from './SlotHasUser';
import { UserEmail } from './UserEmail';

@Entity('user')
export class User {
    @PrimaryGeneratedColumn({
        type: 'int',
        name: 'id',
        comment: 'Unique ID for the user'
    })
    id: number;

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

    @Column('varchar', {
        name: 'name',
        comment: 'Name of the user',
        length: 255
    })
    name: string;

    @Column('varchar', {
        name: 'phone',
        comment: 'Mobile no of the user',
        length: 30,
        nullable: true
    })
    phone: string | null;

    @Column('varchar', {
        name: 'password',
        comment: 'Small encrypted for the user',
        length: 255
    })
    password: string;

    @Column('varchar', {
        name: 'flow_address',
        comment: 'Flow Address allocated for the user',
        length: 25,
        unique: true,
        nullable: true
    })
    flowAddress: string;

    @Column('tinyint', {
        name: 'flow_acc_setup_status',
        comment: '1 if flow account has been setup for the allocated address',
        default: 0
    })
    flowAccSetupStatus: 0 | 1;

    @OneToMany(() => AssetOrg, (assetOrg) => assetOrg.user)
    assetOrgs: AssetOrg[];

    @OneToMany(() => CertData, (certData) => certData.user)
    certData: CertData[];

    @OneToMany(() => Certificate, (certificate) => certificate.signerIssuer)
    certificates: Certificate[];

    @OneToMany(() => Certificate, (certificate) => certificate.user)
    certificates2: Certificate[];

    @OneToMany(() => Certificate, (certificate) => certificate.signerVerifier)
    certificates3: Certificate[];

    @OneToMany(() => Certificate, (certificate) => certificate.signerPreparer)
    certificates4: Certificate[];

    @OneToMany(() => Org, (org) => org.user)
    orgs: Org[];

    @OneToMany(() => OrgRoles, (orgRoles) => orgRoles.user)
    orgRoles: OrgRoles[];

    @OneToMany(() => UserEmail, (userEmail) => userEmail.user, {
        cascade: ['insert']
    })
    userEmails: UserEmail[];

    @OneToMany(() => SlotHasUser, (slotHasUser) => slotHasUser.user)
    slotHasUsers: SlotHasUser[];
}
