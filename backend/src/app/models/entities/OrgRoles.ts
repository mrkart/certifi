import {
    Column,
    Entity,
    Index,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn,
    RelationId
} from 'typeorm';
import { Org } from './Org';
import { User } from './User';

export enum AccessType {
    PREPARER = 'preparer',
    VERIFIER = 'verifier',
    ISSUER = 'issuer',
    USER = 'user'
}

@Index('Org Roles_fk0', ['orgId'], {})
@Index('Org Roles_fk1', ['userId'], {})
@Entity('org_roles')
export class OrgRoles {
    @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
    id: number;

    @Column('int', { name: 'org_id' })
    orgId: number;

    @Column('int', { name: 'user_id' })
    userId: number;

    @Column('varchar', { name: 'access_type', length: 70 })
    accessType: string;

    @Column('timestamp', {
        name: 'datetime_created',
        default: () => 'CURRENT_TIMESTAMP'
    })
    datetimeCreated: Date;

    @Column('timestamp', {
        name: 'datetime_updated',
        default: () => 'CURRENT_TIMESTAMP'
    })
    datetimeUpdated: Date;

    @ManyToOne(() => Org, (org) => org.orgRoles, {
        onDelete: 'RESTRICT',
        onUpdate: 'RESTRICT'
    })
    @JoinColumn([{ name: 'org_id', referencedColumnName: 'id' }])
    org: Org;

    @ManyToOne(() => User, (user) => user.orgRoles, {
        onDelete: 'RESTRICT',
        onUpdate: 'RESTRICT'
    })
    @JoinColumn([{ name: 'user_id', referencedColumnName: 'id' }])
    user: User;
}
