import { isEmpty } from 'class-validator';
import { Repository } from 'typeorm';
import getDataSource from '../../config/datasource';
import { ResourceNotFoundError } from '../../errors';
import { Org } from '../entities/Org';

const OrgRepository = getDataSource()
    .getRepository(Org)
    .extend({
        findById: async function (orgId: number) {
            const org = await this.findOneBy({
                id: orgId
            });
            if (isEmpty(org)) {
                throw new ResourceNotFoundError('Organisation does not exist');
            }
            return org;
        }
    });
export default OrgRepository;
