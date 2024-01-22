const fs = require('fs');
const { PDFDocument, rgb } = require('pdf-lib');

exports.convertImgToPdf = async(imagePath,pdfPath) =>{
    const image = await fs.promises.readFile(imagePath);

	const pdfDoc = await PDFDocument.create();
	const page = pdfDoc.addPage([595, 842]);
	const imageEmbed = await pdfDoc.embedJpg(image);

	// Scale the image to fit within the page dimensions while preserving aspect ratio.
	const { width, height } = imageEmbed.scaleToFit(
		page.getWidth(),
		page.getHeight(),
	);

	// Draw the image on the PDF page.
	page.drawImage(imageEmbed, {
		x: page.getWidth() / 2 - width / 2, // Center the image horizontally.
		y: page.getHeight() / 2 - height / 2, // Center the image vertically.
		width,
		height,
		color: rgb(0, 0, 0), // Set the image color to black.
	});

	const pdfBytes = await pdfDoc.save();
	await fs.promises.writeFile(pdfPath, pdfBytes);
}