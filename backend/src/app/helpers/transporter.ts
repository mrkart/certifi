import { isEmpty } from 'class-validator';
import { createTransport } from 'nodemailer';
import { UnhandledError } from '../errors';
export class MailTransporterFactory {
    static createTransporter(
        host: string = process.env.EMAIL_HOST,
        port: number = parseInt(process.env.EMAIL_PORT),
        user: string = process.env.EMAIL_USER_NAME,
        pass: string = process.env.EMAIL_PASSWORD
    ) {
        if (
            isEmpty(host) ||
            isEmpty(port) ||
            isNaN(port) ||
            isEmpty(user) ||
            isEmpty(pass)
        ) {
            throw new UnhandledError(
                new Error(
                    'Invallid email configuration received. Please proivde correct configuration'
                )
            );
        }
        return createTransport({
            host,
            port,
            secure: port === 465 ? true : false,
            auth: {
                user,
                pass
            }
        });
    }
}

export default MailTransporterFactory;
