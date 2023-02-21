import { isNotEmpty } from 'class-validator';
import { Repository } from 'typeorm';
import { dataSource } from '../../config/datasource';
import { ResourceExistsError } from '../../errors';
import { Slot } from '../entities/Slot';
import { SlotHasUser } from '../entities/SlotHasUser';

interface SlotRepositoryInterface {
    findOrCreate: (slotName: string, orgId: number) => Promise<Slot>;
    addUserToSlot: (slotId: number, userId: number) => Promise<SlotHasUser>;
}
const SlotRepository = dataSource.getRepository(Slot).extend({
    findOrCreate: async function (
        this: Repository<Slot> & SlotRepositoryInterface,
        slotName: string,
        orgId: number
    ): Promise<Slot> {
        const slot = await this.findOneBy({
            slotTitle: slotName
        });
        if (isNotEmpty(slot)) {
            return slot;
        }
        return await this.save(
            this.create({
                orgId,
                slotTitle: slotName
            })
        );
    },
    addUserToSlot: async function (
        this: Repository<Slot> & SlotRepositoryInterface,
        slotId: number,
        userId: number
    ): Promise<SlotHasUser> {
        const slotHasUser = await this.manager
            .getRepository(SlotHasUser)
            .findOneBy({
                slotId,
                userId
            });
        if (isNotEmpty(slotHasUser)) {
            throw new ResourceExistsError('User already in slot');
        }
        return await this.manager.getRepository(SlotHasUser).save(
            this.manager.getRepository(SlotHasUser).create({
                slotId,
                userId
            })
        );
    }
} as SlotRepositoryInterface);

export default SlotRepository;
