import {
    Column,
    Entity,
    Index,
    JoinColumn,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn,
    RelationId
} from 'typeorm';
import { AssetOrg } from './AssetOrg';
import { CertData } from './CertData';
import { Certificate } from './Certificate';
import { UserEmail } from './UserEmail';
import { User } from './User';
import { OrgRoles } from './OrgRoles';
import { Slot } from './Slot';
import { Course } from './Course';

@Index('Org_fk0', ['userId'], {})
@Index('Org_fk1', ['userEmailId'], {})
@Entity('org')
export class Org {
    @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
    id: number;

    @Column('int', { name: 'user_id' })
    userId: number;

    @Column('int', { name: 'user_email_id' })
    userEmailId: number;

    @Column('varchar', { name: 'org_name', length: 70 })
    orgName: string;

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

    @OneToMany(() => AssetOrg, (assetOrg) => assetOrg.org)
    assetOrgs: AssetOrg[];

    @OneToMany(() => CertData, (certData) => certData.org)
    certData: CertData[];

    @OneToMany(() => Certificate, (certificate) => certificate.org)
    certificates: Certificate[];

    @ManyToOne(() => UserEmail, (userEmail) => userEmail.orgs, {
        onDelete: 'RESTRICT',
        onUpdate: 'RESTRICT'
    })
    @JoinColumn([{ name: 'user_email_id', referencedColumnName: 'id' }])
    userEmail: UserEmail;

    @ManyToOne(() => User, (user) => user.orgs, {
        onDelete: 'RESTRICT',
        onUpdate: 'RESTRICT'
    })
    @JoinColumn([{ name: 'user_id', referencedColumnName: 'id' }])
    user: User;

    @OneToMany(() => OrgRoles, (orgRoles) => orgRoles.org, {
        cascade: ['insert']
    })
    orgRoles: OrgRoles[];

    @OneToMany(() => Slot, (slots) => slots.org)
    slots: Slot[];

    @OneToMany(() => Course, (course) => course.org)
    courses: Course[];
}
