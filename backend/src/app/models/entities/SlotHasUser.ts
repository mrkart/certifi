import {
    Column,
    Entity,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn
} from 'typeorm';
import { Slot } from './Slot';
import { User } from './User';

@Entity('slot_has_user')
export class SlotHasUser {
    @PrimaryGeneratedColumn()
    id: number;

    @Column('int', { name: 'slot_id', comment: 'ID of the slot' })
    slotId: number;

    @Column('int', { name: 'user_id', comment: 'Id  of the organisation' })
    userId: number;

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

    @ManyToOne(() => User, (user) => user.slotHasUsers, {
        onDelete: 'RESTRICT',
        onUpdate: 'RESTRICT'
    })
    @JoinColumn([{ name: 'user_id', referencedColumnName: 'id' }])
    user: User;

    @ManyToOne(() => Slot, (slot) => slot.slotHasUsers, {
        onDelete: 'RESTRICT',
        onUpdate: 'RESTRICT'
    })
    @JoinColumn([{ name: 'slot_id', referencedColumnName: 'id' }])
    slot: Slot;
}
