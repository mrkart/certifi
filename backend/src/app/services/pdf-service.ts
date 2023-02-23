import {
    PDFDocument,
    PDFName,
    PDFNumber,
    PDFString,
    PDFDict,
    PDFArray,
    degrees,
    Color,
    ColorTypes,
    rgb,
    StandardFonts
} from 'pdf-lib';
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

        // Add the certification details
        const detailFont = await pdfDoc.embedFont(StandardFonts.Helvetica);
        page.drawText(
            `in recognition of successful completion of the course ${data.courseName}\n` +
                `with a final grade of ${data.grade}.\n` +
                `Institution: ${data.instituionName}\n` +
                `Batch: ${data.batchName}\n` +
                `Certificate Number: ${data.certificateNumber}`,
            {
                x: nameX,
                y: nameY - 38,
                size: 16,
                font: detailFont,
                color: rgb(51 / 255, 51 / 255, 51 / 255)
            }
        );

        // Save the updated PDF document to a file
        const pdfBytes = await pdfDoc.save();
        await fs.writeFile(outputPath, pdfBytes);
    }
}

const pdfService = new PdfService();

export default pdfService;
