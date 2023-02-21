import { hash } from 'bcrypt';
import { config } from 'dotenv';
import { join } from 'path';
import { exit } from 'process';
import { DataSource } from 'typeorm';
import { Org } from '../models/entities/Org';
import { AccessType } from '../models/entities/OrgRoles';
import { User } from '../models/entities/User';
import { UserEmail } from '../models/entities/UserEmail';
console.log('.env path', join(__dirname, '../../../.env'));
config({ path: join(__dirname, '../../../.env') });

console.log('entities', join(__dirname, '../models/entities/*{.ts,.js}'));
console.log('host', process.env.MYSQL_HOST);
export const dataSource = new DataSource({
    type: 'mysql',
    host: process.env.MYSQL_HOST,
    port: parseInt(process.env.MYSQL_PORT),
    username: process.env.MYSQL_USERNAME,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
    synchronize: true,
    logging: process.env.LOG_QUERY == 'true' || false,
    entities: [join(__dirname, '../models/entities/*{.ts,.js}')]
});

async function SeedOrg() {
    await dataSource.initialize();
    const users: User[] = await dataSource.getRepository(User).save(
        dataSource.getRepository(User).create([
            {
                name: 'Andrew Barrett',
                password: await hash('upfront vixen replace sputter', 16),
                phone: '501-550-7862',
                userEmails: [
                    dataSource.getRepository(UserEmail).create({
                        email: 'andrewbarrett.opticore@yopmail.com'
                    })
                ]
            },
            {
                name: 'Christy Gallegos',
                password: await hash('gotten tanning hasty quadrant', 16),
                phone: '239-433-2966',
                userEmails: [
                    dataSource.getRepository(UserEmail).create({
                        email: 'christygallegos.opticore@yopmail.com'
                    })
                ]
            },
            {
                name: 'Kelly Smith',
                password: await hash('reformed culpable cleft defame', 16),
                phone: '913-895-4082',
                userEmails: [
                    dataSource.getRepository(UserEmail).create({
                        email: 'kellysmith.opticore@yopmail.com'
                    })
                ]
            },
            {
                name: 'Harry Shepherd',
                password: await hash('onset usher refurbish effects', 16),
                phone: '352-294-5273',
                userEmails: [
                    dataSource.getRepository(UserEmail).create({
                        email: 'harryshepherd.cet@yopmail.com'
                    })
                ]
            },
            {
                name: 'Joseph Gonzalez',
                password: await hash('connector educated emu shelving', 16),
                phone: '573-969-1820',
                userEmails: [
                    dataSource.getRepository(UserEmail).create({
                        email: 'josephgonzalez.cet@yopmail.com'
                    })
                ]
            },
            {
                name: 'Jessica Christensen',
                password: await hash('game reporter atrophy rehab', 16),
                phone: '803-743-7049',
                userEmails: [
                    dataSource.getRepository(UserEmail).create({
                        email: 'jessicachristensen.cet@yopmail.com'
                    })
                ]
            }
        ])
    );

    const orgs: Org[] = await dataSource.getRepository(Org).save(
        dataSource.getRepository(Org).create([
            {
                orgName: 'Opticore Engineering',
                userEmail: users[0].userEmails[0],
                user: users[0],
                orgRoles: [
                    {
                        accessType: AccessType.ISSUER,
                        user: users[0]
                    },
                    {
                        accessType: AccessType.PREPARER,
                        user: users[1]
                    },
                    {
                        accessType: AccessType.VERIFIER,
                        user: users[2]
                    }
                ]
            },
            {
                orgName: 'Creative Engineering Technologies',
                userEmail: users[3].userEmails[0],
                user: users[3],
                orgRoles: [
                    {
                        accessType: AccessType.ISSUER,
                        user: users[3]
                    },
                    {
                        accessType: AccessType.PREPARER,
                        user: users[4]
                    },
                    {
                        accessType: AccessType.VERIFIER,
                        user: users[5]
                    }
                ]
            }
        ])
    );
    return orgs;
}

SeedOrg()
    .then((orgs) => {
        console.log(JSON.stringify(orgs, null, 2));
        exit(0);
    })
    .catch((e) => {
        console.error(e);
        exit(1);
    });
