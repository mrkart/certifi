import { isEmail } from 'class-validator';
import { config } from 'dotenv';
import { join } from 'path';
import { exit } from 'process';
import MailTransporterFactory from '../helpers/transporter';
config({ path: join(__dirname, '../../../.env') });

async function main(emails: string[]) {
    // create reusable transporter object using the default SMTP transport
    let transporter = MailTransporterFactory.createTransporter(
        process.env.EMAIL_HOST,
        parseInt(process.env.EMAIL_PORT),
        process.env.EMAIL_USER_NAME,
        process.env.EMAIL_PASSWORD
    );

    // console.log(`receipents: ${emails.join(',')}`)
    // send mail with defined transport object
    let info = await transporter.sendMail({
        from: '"Certifi.ly Test email" <reach@certifi.ly>', // sender address
        to: emails.join(','), // list of receivers
        subject: 'Hello ✔', // Subject line
        text: 'Hello world?', // plain text body
        html: '<b>Hello world?</b>' // html body
    });

    console.log('Message sent: %s', info.messageId);
}

const args = process.argv.slice(2);
if (args.every((arg) => isEmail(arg))) {
    main(args)
        .then(() => {
            exit(0);
        })
        .catch((e) => {
            console.error('Message could not be sent', e);
            exit(1);
        });
} else {
    console.error('Argumets should be a valid email', args);
    exit(1);
}
