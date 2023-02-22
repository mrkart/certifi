import { PDFDocument, PDFName, PDFNumber, PDFString, PDFDict, PDFArray, degrees, Color } from 'pdf-lib';
import fs from 'fs/promises';


private async function createCertificate(name: string, templatePath: string, outputPath: string) {
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

  const nameWidth = font.widthOfTextAtSize(name, 40);

  // Define the position on the page to place the name
  // const nameX = 330;
  const nameX = page.getWidth() / 2 - nameWidth / 2 - 30

  const nameY = 350;

  // Rotate the page to landscape mode
  page.setRotation(degrees(0));

  // Add the name to the PDF document
  page.drawText(name, {
    x: nameX,
    y: nameY,
    size: fontSize,
    font,
  });

  // Save the updated PDF document to a file
  const pdfBytes = await pdfDoc.save();
  await fs.writeFile(outputPath, pdfBytes);
}
