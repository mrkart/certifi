import { PDFDocument, degrees, rgb, StandardFonts } from 'pdf-lib';
import fs from 'fs/promises';
import { PdfData } from '../helpers';

export class PdfService {
    public async createCertificate(
        data: PdfData,
        templatePath: string,
        outputPath: string
    ): Promise<void> {
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
        const { width, height } = page.getSize();

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
            `ISSUED BY\n` +
            `${data.instituionName}\n` +
            `Certificate Number: ${data.certificateNumber}`;

        issuerText.split('\n').forEach((line, index) => {
            // calculate the position of the text
            const textWidth = detailFont.widthOfTextAtSize(line, 16);
            const textHeight = detailFont.heightAtSize(16);
            const detailX = width / 2 - textWidth / 2;
            const detailY =
                350 - 38 - 80 - index * (textHeight + 10) - textHeight / 2;

            // Add the certification details
            page.drawText(line, {
                x: detailX,
                y: detailY,
                size: 16,
                font: detailFont,
                color: rgb(51 / 255, 51 / 255, 51 / 255)
            });
        });

        // Save the updated PDF document to a file
        const pdfBytes = await pdfDoc.save();
        await fs.writeFile(outputPath, pdfBytes);
    }
}

const pdfService = new PdfService();

export default pdfService;
