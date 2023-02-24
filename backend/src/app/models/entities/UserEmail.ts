import { Certificate } from './Certificate';
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
import { CertData } from './CertData';
import { Org } from './Org';
import { User } from './User';

@Index('uq_email', ['email'], { unique: true })
@Entity('user_email')
export class UserEmail {
    @PrimaryGeneratedColumn({ type: 'int', name: 'id', comment: 'Unique ID' })
    id: number;

    @Column('int', { name: 'user_id', comment: 'Unique ID for the user ' })
    userId: number;

    @Column('varchar', {
        name: 'email',
        comment: 'Email of the user',
        length: 255
    })
    email: string;

    @Column('tinyint', {
        name: 'verification_status',
        comment: "Email's verification status",
        default: () => "'0'"
    })
    verificationStatus: number;

    @Column('tinyint', {
        name: 'is_primary',
        comment: 'Is this the primary email for the user?',
        default: () => "'0'"
    })
    isPrimary: number;

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

    @OneToMany(() => CertData, (certData) => certData.userEmail)
    certData: CertData[];

    @OneToMany(() => Certificate, (certificate) => certificate.userEmail)
    certificates: Certificate[];

    @OneToMany(() => Org, (org) => org.userEmail)
    orgs: Org[];

    @ManyToOne(() => User, (user) => user.userEmails, {
        onDelete: 'RESTRICT',
        onUpdate: 'RESTRICT'
    })
    @JoinColumn([{ name: 'user_id', referencedColumnName: 'id' }])
    user: User;
}
