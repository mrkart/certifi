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
import { Slot } from './Slot';
import { Org } from './Org';
import { UserEmail } from './UserEmail';
import { User } from './User';
import { Certificate } from './Certificate';

@Index('Cert Data_fk0', ['orgId'], {})
@Index('Cert Data_fk1', ['userId'], {})
@Index('Cert Data_fk2', ['userEmailId'], {})
@Index('Cert Data_fk3', ['slotId'], {})
@Entity('cert_data')
export class CertData {
    @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
    id: number;

    @Column('int', { name: 'org_id' })
    orgId: number;

    @Column('int', { name: 'user_id' })
    userId: number;

    @Column('int', { name: 'user_email_id' })
    userEmailId: number;

    @Column('int', { name: 'slot_id' })
    slotId: number;

    @Column('varchar', { name: 'json_data', length: 70 })
    jsonData: string;

    @Column('varchar', { name: 'certificate_no', length: 70 })
    certificateNo: string;

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

    @ManyToOne(() => Slot, (slot) => slot.certData, {
        onDelete: 'RESTRICT',
        onUpdate: 'RESTRICT'
    })
    @JoinColumn([{ name: 'slot_id', referencedColumnName: 'id' }])
    slot: Slot;

    @ManyToOne(() => Org, (org) => org.certData, {
        onDelete: 'RESTRICT',
        onUpdate: 'RESTRICT'
    })
    @JoinColumn([{ name: 'org_id', referencedColumnName: 'id' }])
    org: Org;

    @ManyToOne(() => UserEmail, (userEmail) => userEmail.certData, {
        onDelete: 'RESTRICT',
        onUpdate: 'RESTRICT'
    })
    @JoinColumn([{ name: 'user_email_id', referencedColumnName: 'id' }])
    userEmail: UserEmail;

    @ManyToOne(() => User, (user) => user.certData, {
        onDelete: 'RESTRICT',
        onUpdate: 'RESTRICT'
    })
    @JoinColumn([{ name: 'user_id', referencedColumnName: 'id' }])
    user: User;
}
