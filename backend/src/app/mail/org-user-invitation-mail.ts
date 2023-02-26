import { Transporter } from 'nodemailer';
import SMTPTransport from 'nodemailer/lib/smtp-transport';

export interface OrgUserInvitationRequest {
    receipientAddress: string;
    recipientFirstName: string;
    orgName: string;
    password: string;
    address: string;
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
            subject: `${this.request.orgName} has invited you to Certifi.ly`,
            html: `
                <!doctype html>
                <html>
                <head>
                <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
                <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
                <title>Welcome to Certifi.ly</title>
                <style>
                img {border: none;-ms-interpolation-mode: bicubic;max-width: 100%; }
                body {background-color: #f6f6f6;font-family: sans-serif;-webkit-font-smoothing: antialiased;font-size: 14px;line-height: 1.4;margin: 0;padding: 0;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%; }
                table {border-collapse: separate;mso-table-lspace: 0pt;mso-table-rspace: 0pt;width: 100%; }table td {font-family: sans-serif;font-size: 14px;vertical-align: top; }
                .body {background-color: #f6f6f6;width: 100%; }
                .container {display: block;margin: 0 auto !important;/* makes it centered */max-width: 580px;padding: 10px;width: 580px; }
                .content {box-sizing: border-box;display: block;margin: 0 auto;max-width: 580px;padding: 10px; }
                .main {background: #ffffff;border-radius: 3px;width: 100%; }
                .wrapper {box-sizing: border-box;padding: 20px;}
                .content-block {padding-bottom: 10px;padding-top: 10px;}
                .footer {clear: both;margin-top: 10px;text-align: center;width: 100%; }
                .footer td,.footer p,.footer span,.footer a {color: #999999;font-size: 12px;text-align: center; }
                h1,h2,h3,h4 {color: #000000;font-family: sans-serif;font-weight: 400;line-height: 1.4;margin: 0;margin-bottom: 30px; }
                h1 {font-size: 35px;font-weight: 300;text-align: center;text-transform: capitalize; }
                p,ul,ol {font-family: sans-serif;font-size: 14px;font-weight: normal;margin: 0;margin-bottom: 15px; }
                p li,ul li,ol li {list-style-position: inside;margin-left: 5px; }
                a {color: #005fff;text-decoration: underline; }
                .btn {box-sizing: border-box;width: 100%; }
                .btn > tbody > tr > td {padding-bottom: 15px; }
                .btn table {width: auto; }
                .btn table td {background-color: #ffffff;border-radius: 5px;text-align: center; }
                .btn a {background-color: #ffffff;border: solid 1px #005fff;border-radius: 5px;box-sizing: border-box;color: #005fff;cursor: pointer;display: inline-block;font-size: 14px;font-weight: bold;margin: 0;padding: 12px 25px;text-decoration: none;text-transform: capitalize;}
                .btn-primary table td {background-color: #005fff; }
                .btn-primary a {background-color: #005fff;border-color: #005fff;color: #ffffff; }
                .last {margin-bottom: 0; }
                .first {margin-top: 0; }
                .align-center {text-align: center; }
                .align-right {text-align: right; }
                .align-left {text-align: left; }
                .clear {clear: both; }
                .mt0 {margin-top: 0;}
                .mb0 {margin-bottom: 0; }
                .preheader {color: transparent;display: none;height: 0;max-height: 0;max-width: 0;opacity: 0;overflow: hidden;mso-hide: all;visibility: hidden;width: 0; }
                .powered-by a {text-decoration: none; }
                hr {border: 0;border-bottom: 1px solid #f6f6f6;margin: 20px 0; }
                @media only screen and (max-width: 620px) {
                table.body h1 {font-size: 28px !important;margin-bottom: 10px !important; }
                table.body p,table.body ul,table.body ol,table.body td,table.body span,table.body a {font-size: 16px !important; }
                table.body .wrapper,table.body .article {padding: 10px !important; }
                table.body .content {padding: 0 !important; }
                table.body .container {padding: 0 !important;width: 100% !important; }
                table.body .main {border-left-width: 0 !important;border-radius: 0 !important;border-right-width: 0 !important; }
                table.body .btn table {width: 100% !important; }
                table.body .btn a {width: 100% !important; }
                table.body .img-responsive {height: auto !important;max-width: 100% !important;width: auto !important; }}

                @media all {
                .ExternalClass {width: 100%; }
                .ExternalClass,.ExternalClass p,.ExternalClass span,.ExternalClass font,.ExternalClass td,.ExternalClass div {line-height: 100%; }
                .apple-link a {color: inherit !important;font-family: inherit !important;font-size: inherit !important;font-weight: inherit !important;line-height: inherit !important;text-decoration: none !important; }
                #MessageViewBody a {color: inherit;text-decoration: none;font-size: inherit;font-family: inherit;font-weight: inherit;line-height: inherit;}
                .btn-primary table td:hover {background-color: #414141 !important; }
                .btn-primary a:hover {background-color: #414141 !important;border-color: #414141 !important; } 
                }
                </style>
                </head>
                <body>
                <table role="presentation" border="0" cellpadding="0" cellspacing="0" class="body">
                <tr>
                <td>&nbsp;</td>
                <td class="container">
                <div class="content">

                <!-- START CENTERED WHITE CONTAINER -->
                <table role="presentation" class="main">

                <!-- START MAIN CONTENT AREA -->
                <tr>
                <td class="wrapper">
                <table role="presentation" border="0" cellpadding="0" cellspacing="0">
                    <tr>
                        <td align="center">
                            <table role="presentation" border="0" cellpadding="10" cellspacing="0" style="background: #dbe9ff; width: 100%; margin: 0px auto 30px;">
                                <tbody>
                                <tr>
                                
                                    <td align="center"> <img src="https://alpha.certifi.ly/logo.png" alt="Certifi.ly" width="150" border="0" style="border:0; outline:none; text-decoration:none; display:block; "></td>
                                </tr>
                                </tbody>
                            </table>
                            
                        
                        </td>
                    </tr>
                <tr>
                <td>
                <p>Hi <span style="font-weight: bold;">${this.request.recipientFirstName}</span>,</p>
                <p>Welcome to Certifi.ly, Easy way to collect & store your professional certificates, documents, memberships, cards & tickets as NFTs on Flow blockchain.
                </p>
                <p>
                Opticore Engineering invited you to use certifi.ly to access your professional NFT documents from them and around the world.
                </p>
                <p>You have been invited to Certifi.ly by ${this.request.orgName}.</p>
                <p>Credentials</p>
                <table role="presentation" border="0" cellpadding="10" cellspacing="0" style="background: #eff5ff; width: auto; margin: 30px auto;">
                    <tbody>
                    <tr>
                        <td style="width: 75px; border: 1px solid #fff; border-right: none; border-bottom: none;">Email</td>
                        <td style="font-weight: bold; border: 1px solid #fff;  border-bottom: none; min-width: 150px;">${this.request.receipientAddress}</td>
                    </tr>
                    <tr>
                        <td style="border: 1px solid #fff;  border-right: none; border-bottom: none;">Password</td>
                        <td style="font-weight: bold; border: 1px solid #fff; ">${this.request.password}</td>
                    </tr>
                    </tbody>
                </table>
                <table role="presentation" border="0" cellpadding="0" cellspacing="0" class="btn btn-primary" style="margin: 30px 0px;">
                <tbody>
                <tr>
                    <td align="center">
                    <table role="presentation" border="0" cellpadding="0" cellspacing="0">
                        <tbody>
                        <tr>
                            <td><a href="https://alpha.certifi.ly/login" target="_blank">LOGIN</a> </td>
                        </tr>
                        </tbody>
                    </table>
                    </td>
                </tr>
                </tbody>
                </table>
                <p>Every new certifi.ly user gets a walletless flow blockchain account onboarding for free. 
                Once you login to Certifi.ly & Connected your Flow Wallet (Blocto)., 
                Below Flow account ownership will be transferred to your connected flow account.
                </p>
                <p>Your Certifi.ly Flow Account for ${this.request.receipientAddress}</p>
                <p>${this.request.address}</p>
                <p>Regards,</p>
                <p style="font-weight: bold;">Certifi.ly Team</p>
                <p><a href="https://www.certifi.ly">www.certifi.ly</a></p>
                <p>reach@certifi.ly</p>
                </td>
                </tr>
                </table>
                </td>
                </tr>

                <!-- END MAIN CONTENT AREA -->
                </table>
                <!-- END CENTERED WHITE CONTAINER -->
                </div>
                </td>
                <td>&nbsp;</td>
                </tr>
                </table>
                </body>
                </html>
            `
        });
        return rs;
    }
}
