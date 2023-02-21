import { isEmpty } from 'class-validator';
import { Repository } from 'typeorm';
import getDataSource from '../../config/datasource';
import { ResourceNotFoundError } from '../../errors';
import { Org } from '../entities/Org';

interface OrgRepositoryInterface {
    findById: (id: number) => Promise<Org>;
}

type This = Repository<Org> & OrgRepositoryInterface;
const OrgRepository = getDataSource()
    .getRepository(Org)
    .extend({
        findById: async function (this: This, orgId: number) {
            const org = await this.findOneBy({
                id: orgId
            });
            if (isEmpty(org)) {
                throw new ResourceNotFoundError('Organisation does not exist');
            }
            return org;
        }
    } as OrgRepositoryInterface & ThisType<Repository<Org> & OrgRepositoryInterface>);
export default OrgRepository;
