import { isNotEmpty } from 'class-validator';
import { Repository } from 'typeorm';
import getDataSource from '../../config/datasource';
import { Course } from '../entities/Course';

interface CourseRepositoryInterface {
    findOrCreate: (orgId: number, name: string) => Promise<Course>;
}

type This = Repository<Course> & CourseRepositoryInterface;
const CourseRepoistory = getDataSource()
    .getRepository(Course)
    .extend({
        findOrCreate: async function (
            this: This,
            orgId: number,
            name: string
        ): Promise<Course> {
            const course = await this.findOneBy({
                name
            });
            if (isNotEmpty(course)) {
                return course;
            }
            return await this.save(
                this.create({
                    name,
                    orgId
                })
            );
        }
    } as CourseRepositoryInterface & ThisType<Repository<Course> & CourseRepositoryInterface>);
export default CourseRepoistory;
