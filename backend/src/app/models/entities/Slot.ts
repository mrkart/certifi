import {
    Column,
    Entity,
    JoinColumn,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn
} from 'typeorm';
import { CertData } from './CertData';
import { Org } from './Org';
import { SlotHasUser } from './SlotHasUser';
import { User } from './User';

@Entity('slot')
export class Slot {
    @PrimaryGeneratedColumn({
        type: 'int',
        name: 'id',
        comment: 'Unique ID for the user'
    })
    id: number;

    @Column('varchar', {
        name: 'slot_title',
        comment: 'name of the slot',
        length: 255
    })
    slotTitle: string;

    @Column('integer', {
        name: 'org_id',
        comment: 'ID of the organisation'
    })
    orgId: number;

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

    @ManyToOne(() => Org, (org) => org.slots, {
        onDelete: 'RESTRICT',
        onUpdate: 'RESTRICT'
    })
    @JoinColumn([{ name: 'org_id', referencedColumnName: 'id' }])
    org: Org;

    @OneToMany(() => CertData, (certData) => certData.slot)
    certData: CertData[];

    @OneToMany(() => SlotHasUser, (slotHasUser) => slotHasUser.slot, {
        cascade: ['insert']
    })
    slotHasUsers: SlotHasUser[];
}
