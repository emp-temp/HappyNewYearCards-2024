import { PDFDocument } from "https://cdn.skypack.dev/pdf-lib@^1.7.0";
import fontkit from 'https://cdn.skypack.dev/@pdf-lib/fontkit@^1.0.0?dts';

const calcPt = (mm: number) => (mm / 25.4) * 72;

const drawVertical = (page: any, text: string, font: any, x: number, y: number, size: number) => {
  let textHeight = text.length * font.heightAtSize(size)
  for(let i = 0; i < text.length; i++) {
    page.drawText(text.at(i), {
      font: customFont,
      x: x,
      y: y + textHeight - i * customFont.heightAtSize(size),
      size: size
    })
  }
}

const fontFilePath = 'M_PLUS_Rounded_1c/MPLUSRounded1c-Regular.ttf'
const fontBytes = await Deno.readFile(fontFilePath);

const pdfDoc = await PDFDocument.create();
pdfDoc.registerFontkit(fontkit);
const customFont = await pdfDoc.embedFont(fontBytes);

const page = pdfDoc.addPage([calcPt(100), calcPt(148)]);

const pdfBytes = await pdfDoc.save();
await Deno.writeFile('./out.pdf', pdfBytes);
console.log('PDF file written to ./out.pdf');
