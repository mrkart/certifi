import { join } from 'path';
import { DataSource } from 'typeorm';
export const dataSource = new DataSource({
    type: 'mysql',
    host: process.env.MYSQL_HOST,
    port: parseInt(process.env.MYSQL_PORT),
    username: process.env.MYSQL_USERNAME,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
    synchronize: true,
    logging: process.env.LOG_QUERY == 'true' || false,
    entities: [join(__dirname, '../models/entities/*{.ts,.js}')],
    migrations: [join(__dirname, '../models/migrations/*{.ts,.js}')]
});

export default function getDataSource(): DataSource {
    return dataSource;
}
