import { Transporter } from 'nodemailer';
import SMTPTransport from 'nodemailer/lib/smtp-transport';

export interface OrgUserInvitationRequest {
    receipientAddress: string;
    recipientFirstName: string;
    orgName: string;
    password: string;
}

export class OrgUserInviationMail {
    public constructor(
        private request: OrgUserInvitationRequest,
        private mailTransporter: Transporter<SMTPTransport.SentMessageInfo>
    ) {}

    public async sendMail() {
        const rs = await this.mailTransporter.sendMail({
            from: process.env.EMAIL_USER_NAME,
            to: this.request.receipientAddress,
            subject: `Welcome to Certifi.ly`,
            html: `
            <!DOCTYPE html>
            <html lang="en">

            <head>
                <meta name="viewport" content="width=device-width" />
                <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
                <title>Welcome to Certifi.ly</title>
            </head>

            <body>
                <div
                    style="width: 650px; display: block; margin: 0px auto; font-size: 13px; font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;">
                    <p>Hi ${this.request.recipientFirstName},</p>
                    <p>You have been invited to <a herf="https://certifi.ly">Certifi.ly</a> by ${this.request.orgName}.</p>
                    <p>Use this password to join <a herf="https://certifi.ly">Certifi.ly</a></p>
                    <p>Password: ${this.request.password}</p>
                    <p>Regards,</p>
                    <p><a herf="https://certifi.ly">Certifi.ly</a> team</p>
                </div>
            </body>

            </html>
            `
        });
        return rs;
    }
}
