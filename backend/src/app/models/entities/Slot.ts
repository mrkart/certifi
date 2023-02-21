import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { CertData } from './CertData';

@Entity('slot')
export class Slot {
    @PrimaryGeneratedColumn({
        type: 'int',
        name: 'id',
        comment: 'Unique ID for the user'
    })
    id: number;

    @Column('varchar', {
        name: 'userId',
        comment: 'Name of the user',
        length: 255
    })
    userId: string;

    @Column('varchar', {
        name: 'slotTitle',
        comment: 'Email ID of the user',
        length: 255
    })
    slotTitle: string;

    @Column('varchar', {
        name: 'orgId',
        comment: 'Email ID of the user',
        length: 255
    })
    orgId: string;

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

    @OneToMany(() => CertData, (certData) => certData.slot)
    certData: CertData[];
}
