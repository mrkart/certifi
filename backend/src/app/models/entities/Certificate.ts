import {
    Column,
    Entity,
    Index,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn
} from 'typeorm';
import { CertTemplate } from './CertTemplate';
import { User } from './User';
import { Org } from './Org';
import { UserEmail } from './UserEmail';
import { CertificateMetadata } from '../../helpers';
import { Course } from './Course';
import { Slot } from './Slot';

@Index('Certificate_fk0', ['orgId'], {})
@Index('Certificate_fk1', ['userId'], {})
@Index('Certificate_fk3', ['signerPreparerId'], {})
@Index('Certificate_fk4', ['signerVerifierId'], {})
@Index('Certificate_fk5', ['signerIssuerId'], {})
@Index('Certificate_fk6', ['certTemplateId'], {})
@Entity('certificate')
export class Certificate {
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

    @Column('int', { name: 'nft_id', unique: true })
    nftId: number;

    @Column('varchar', { name: 'certificate_number', length: 70 })
    certificateNumber: string;

    @Column('varchar', { name: 'grade', length: 70 })
    grade: string;

    @Column('int', { name: 'course_id' })
    courseId: number;

    @Column('int', { name: 'signer_preparer_id' })
    signerPreparerId: number;

    @Column('int', { name: 'signer_verifier_id' })
    signerVerifierId: number;

    @Column('int', { name: 'signer_issuer_id' })
    signerIssuerId: number;

    @Column('int', { name: 'cert_template_id', nullable: true })
    certTemplateId: number | null;

    @Column('varchar', { name: 'certificate_file_path', length: 255 })
    certificateFilePath: string;

    @Column('varchar', { name: 'thumbnail_path', length: 255 })
    thumbnailPath: string;

    @Column('varchar', { name: 'thumbnail_file_name', length: 70 })
    thumbnailFileName: string;

    @Column('varchar', { name: 'certificate_hash', length: 255 })
    certificateHash: string;

    @Column('varchar', { name: 'metadata_hash', length: 255 })
    metadataHash: string;

    @Column('json', { name: 'metadata_json' })
    metadataJson: CertificateMetadata;

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

    @ManyToOne(
        () => CertTemplate,
        (certTemplate) => certTemplate.certificates,
        {
            onDelete: 'RESTRICT',
            onUpdate: 'RESTRICT'
        }
    )
    @JoinColumn([{ name: 'cert_template_id', referencedColumnName: 'id' }])
    certTemplate: CertTemplate;

    @ManyToOne(() => User, (user) => user.certificates, {
        onDelete: 'RESTRICT',
        onUpdate: 'RESTRICT'
    })
    @JoinColumn([{ name: 'signer_issuer_id', referencedColumnName: 'id' }])
    signerIssuer: User;

    @ManyToOne(() => Org, (org) => org.certificates, {
        onDelete: 'RESTRICT',
        onUpdate: 'RESTRICT'
    })
    @JoinColumn([{ name: 'org_id', referencedColumnName: 'id' }])
    org: Org;

    @ManyToOne(() => User, (user) => user.certificates2, {
        onDelete: 'RESTRICT',
        onUpdate: 'RESTRICT'
    })
    @JoinColumn([{ name: 'user_id', referencedColumnName: 'id' }])
    user: User;

    @ManyToOne(() => User, (user) => user.certificates3, {
        onDelete: 'RESTRICT',
        onUpdate: 'RESTRICT'
    })
    @JoinColumn([{ name: 'signer_verifier_id', referencedColumnName: 'id' }])
    signerVerifier: User;

    @ManyToOne(() => User, (user) => user.certificates4, {
        onDelete: 'RESTRICT',
        onUpdate: 'RESTRICT'
    })
    @JoinColumn([{ name: 'signer_preparer_id', referencedColumnName: 'id' }])
    signerPreparer: User;

    @ManyToOne(() => UserEmail, (userEmail) => userEmail.certificates, {
        onDelete: 'RESTRICT',
        onUpdate: 'RESTRICT'
    })
    @JoinColumn([{ name: 'user_email_id', referencedColumnName: 'id' }])
    userEmail: UserEmail;

    @ManyToOne(() => Course, (course) => course.certificate, {
        onDelete: 'RESTRICT',
        onUpdate: 'RESTRICT'
    })
    @JoinColumn([{ name: 'course_id', referencedColumnName: 'id' }])
    course: Course;

    @ManyToOne(() => Slot, (slot) => slot.certificates, {
        onDelete: 'RESTRICT',
        onUpdate: 'RESTRICT'
    })
    @JoinColumn([{ name: 'slot_id', referencedColumnName: 'id' }])
    slot: Slot;
}
