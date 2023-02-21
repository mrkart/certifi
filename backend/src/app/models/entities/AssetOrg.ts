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
import { User } from './User';
import { Org } from './Org';
import { Certificate } from './Certificate';

@Index('Asset Org_fk0', ['orgId'], {})
@Index('Asset Org_fk1', ['userId'], {})
@Entity('asset_org')
export class AssetOrg {
    @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
    id: number;

    @Column('int', { name: 'org_id' })
    orgId: number;

    @Column('int', { name: 'user_id' })
    userId: number;

    @Column('varchar', { name: 'title', length: 70 })
    title: string;

    @Column('varchar', { name: 'file_path', length: 70 })
    filePath: string;

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

    @ManyToOne(() => User, (user) => user.assetOrgs, {
        onDelete: 'RESTRICT',
        onUpdate: 'RESTRICT'
    })
    @JoinColumn([{ name: 'user_id', referencedColumnName: 'id' }])
    user: User;

    @ManyToOne(() => Org, (org) => org.assetOrgs, {
        onDelete: 'RESTRICT',
        onUpdate: 'RESTRICT'
    })
    @JoinColumn([{ name: 'org_id', referencedColumnName: 'id' }])
    org: Org;

    @OneToMany(
        () => Certificate,
        (certificate) => certificate.certificateFilePath2
    )
    certificates: Certificate[];
}
