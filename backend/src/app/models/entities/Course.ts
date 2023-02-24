
import {
    Column,
    Entity,
    JoinColumn,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn
} from 'typeorm';
import { Certificate } from './Certificate';
import { Org } from './Org';
@Entity('course')
export class Course {
    @PrimaryGeneratedColumn({
        type: 'int',
        name: 'id',
        comment: 'Unique ID for the course'
    })
    id: number;

    @Column('varchar', {
        name: 'name',
        comment: 'name of the course',
        length: 255
    })
    name: string;

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

    @ManyToOne(() => Org, (org) => org.courses, {
        onDelete: 'RESTRICT',
        onUpdate: 'RESTRICT'
    })
    @JoinColumn([{ name: 'org_id', referencedColumnName: 'id' }])
    org: Org;

    @OneToMany(() => Certificate, (certificate) => certificate)
    certificate: Certificate[];
}