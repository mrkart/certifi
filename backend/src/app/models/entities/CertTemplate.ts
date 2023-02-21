import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Certificate } from './Certificate';

@Entity('cert_template')
export class CertTemplate {
    @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
    id: number;

    @Column('varchar', { name: 'title', length: 70 })
    title: string;

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

    @OneToMany(() => Certificate, (certificate) => certificate.certTemplate)
    certificates: Certificate[];
}
