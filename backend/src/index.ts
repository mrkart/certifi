import { config } from 'dotenv';
config();

import './app/config/flow';
import { App } from './app';
import getDataSource from './app/config/datasource';
import { Logger } from './app/helpers';

class Server {
    public static async main(): Promise<void> {
        await getDataSource().initialize();
        const app = new App();
        const domain = process.env.APP_DOMAIN;
        const port = parseInt(process.env.APP_PORT);

        app.listen(domain, port);
    }
}

Server.main().catch((e) => {
    Logger.error('❌ Failed start application\n', e);
});
