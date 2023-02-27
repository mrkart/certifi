import { PDFDocument, degrees, rgb, StandardFonts } from 'pdf-lib';
import fs, { writeFile } from 'fs/promises';
import { PdfData } from '../helpers';
import QRCode from 'qrcode';
import { isEmpty } from 'class-validator';
import { existsSync } from 'fs';
import { pdf } from 'pdf-to-img';
import { createHash } from 'crypto';

export class PdfService {
    public async createCertificate(
        data: PdfData,
        templatePath: string,
        outputPath: string
    ): Promise<void> {
        if (isEmpty(process.env.CERTIFICATE_VERIFIACTION_URL)) {
            const error = new Error(
                'Invallid certificate configuration received. Please proivde correct configuration'
            );
            error.name = 'InvalidConfigurationError';
            throw error;
        }
        // Load the existing PDF template
        const templateBytes = await fs.readFile(templatePath);

        // Load the PDF template into a PDF document object
        const pdfDoc = await PDFDocument.load(templateBytes);

        // Retrieve the first page of the PDF document
        const pages = pdfDoc.getPages();
        const page = pages[0];

        // Define the font and font size to use for the name
        const font = await pdfDoc.embedFont('Helvetica-Bold');
        const fontSize = 48;

        const nameWidth = font.widthOfTextAtSize(data.name, 40);

        // Define the position on the page to place the name
        // const nameX = 330;
        const nameX = page.getWidth() / 2 - nameWidth / 2 - 30;

        const nameY = 350;

        // Rotate the page to landscape mode
        page.setRotation(degrees(0));

        // Add the name to the PDF document
        page.drawText(data.name, {
            x: nameX,
            y: nameY,
            size: fontSize,
            font,
            color: rgb(184 / 255, 140 / 255, 47 / 255)
        });

        // Get the width and height of the page
        const { width } = page.getSize();

        // Add the font for the detail content
        const detailFont = await pdfDoc.embedFont(StandardFonts.Helvetica);

        const courseText =
            `for successfully completing ${data.courseName} ` +
            `with a passing grade of ${data.grade}\n` +
            `in the batch of ${data.batchName}\n`;
        courseText.split('\n').forEach((line, index) => {
            // calculate the position of the text
            const textWidth = detailFont.widthOfTextAtSize(line, 16);
            const textHeight = detailFont.heightAtSize(16);
            const detailX = width / 2 - textWidth / 2;
            const detailY =
                350 - 38 - index * (textHeight + 10) - textHeight / 2;

            // Add the certification details
            page.drawText(line, {
                x: detailX,
                y: detailY,
                size: 16,
                font: detailFont,
                color: rgb(51 / 255, 51 / 255, 51 / 255)
            });
        });

        const issuerText =
            'ISSUED BY\n' +
            `${data.instituionName}\n` +
            `Certificate Number: ${data.certificateNumber}`;

        issuerText.split('\n').forEach((line, index) => {
            // calculate the position of the text
            let textWidth = detailFont.widthOfTextAtSize(line, 16);
            let textHeight = detailFont.heightAtSize(16);
            let detailX = width / 2 - textWidth / 2;
            let detailY =
                350 - 38 - 80 - index * (textHeight + 10) - textHeight / 2;
            let fontStyle = detailFont;
            let fontSize = 16;
            if (index === 0) {
                fontStyle = detailFont;
                textWidth = detailFont.widthOfTextAtSize(line, 16);
                textHeight = detailFont.heightAtSize(16);
                detailX = width / 2 - textWidth / 2;
                detailY =
                    350 - 38 - 85 - index * (textHeight + 5) - textHeight / 2;
                fontSize = 12;
            }

            if (index === 1) {
                fontStyle = font;
                textWidth = font.widthOfTextAtSize(line, 16);
                textHeight = font.heightAtSize(16);
                detailX = width / 2 - textWidth / 2;
                detailY =
                    350 - 38 - 80 - index * (textHeight + 10) - textHeight / 2;
                fontSize = 16;
            }

            // Add the certification details
            page.drawText(line, {
                x: detailX,
                y: detailY,
                size: fontSize,
                font: fontStyle,
                color: rgb(51 / 255, 51 / 255, 51 / 255)
            });
        });

        // Generate the QR code image
        const qrCodeData =
            process.env.CERTIFICATE_VERIFIACTION_URL +
            `/${data.certificateNumber}`;
        const qrCodeImage = await QRCode.toDataURL(qrCodeData, {
            errorCorrectionLevel: 'H',
            color: {
                dark: '#333333'
            }
        });
        const qrCodeImageBuffer = Buffer.from(
            qrCodeImage.split(',')[1],
            'base64'
        );

        // Load the QR code image into a PDF image object
        const qrCodeImageDims = { width: 100, height: 100 };
        const qrCodeImageObject = await pdfDoc.embedPng(qrCodeImageBuffer);

        // Add the QR code image to the first page of the PDF document
        const qrCodeImagePage = pages[0];
        qrCodeImagePage.drawImage(qrCodeImageObject, {
            //x: 100,
            x: page.getWidth() - qrCodeImageDims.width - 100,
            y: page.getHeight() - qrCodeImageDims.height - 170,
            width: qrCodeImageDims.width,
            height: qrCodeImageDims.height
        });

        // Save the updated PDF document to a file
        const pdfBytes = await pdfDoc.save();
        await fs.writeFile(outputPath, pdfBytes);
    }

    public async createCertificateThumbnail(
        certificatePath: string,
        outputDir: string
    ): Promise<string> {
        if (existsSync(certificatePath) === false) {
            const err = new Error('Invalid certificate path');
            err.name = 'PathError';
            throw err;
        }
        if (existsSync(outputDir) === false) {
            const err = new Error('Invalid thumbnail output path');
            err.name = 'PathError';
            throw err;
        }
        const thumbnail = await pdf(certificatePath.toString());
        const thumbnailHash = createHash('sha256');
        for await (const byte of thumbnail) {
            thumbnailHash.update(byte);
        }
        const fileName: string = thumbnailHash.digest('hex');
        const outPath = `${outputDir}/${fileName}.png`;
        await writeFile(outPath, thumbnail);
        return outPath;
    }
}

const pdfService = new PdfService();

export default pdfService;
