// 年賀状作成プログラム

import { PDFDocument } from "https://cdn.skypack.dev/pdf-lib@^1.7.0";
import fontkit from "https://cdn.skypack.dev/@pdf-lib/fontkit@^1.0.0?dts";

const calcPt = (mm: number) => (mm / 25.4) * 72;

const defaultFontFilePath = "Roboto/Roboto-Regular.ttf";
const defaultFontBytes = await Deno.readFile(defaultFontFilePath);

const customFontFilePath = "Rubik_Doodle_Shadow/RubikDoodleShadow-Regular.ttf";
const customFontBytes = await Deno.readFile(customFontFilePath);

const pdfDoc = await PDFDocument.create();
pdfDoc.registerFontkit(fontkit);

const defaultFont = await pdfDoc.embedFont(defaultFontBytes);
const customFont = await pdfDoc.embedFont(customFontBytes);

const page = pdfDoc.addPage([calcPt(100), calcPt(148)]);

const backgroundPicture = await Deno.readFile("program.png");
const backgroundImage = await pdfDoc.embedPng(backgroundPicture);
const backgroundDims = backgroundImage.scale(0.2);

page.drawImage(backgroundImage, {
  x: page.getWidth() / 2 - backgroundDims.width / 2,
  y: page.getHeight() / 2 - backgroundDims.height / 2,
  width: backgroundDims.width,
  height: backgroundDims.height,
});

page.drawText("Happy New Year", {
  font: customFont,
  x: calcPt(8),
  y: calcPt(132),
  size: calcPt(10),
});

page.drawText("This New Year's card was generated using this program. ", {
  font: defaultFont,
  x: calcPt(7),
  y: calcPt(18),
  size: calcPt(3),
});
page.drawText("This program was created to express our gratitude ", {
  font: defaultFont,
  x: calcPt(7),
  y: calcPt(14.5),
  size: calcPt(3),
});
page.drawText("for the past year and our hopes for the new year.", {
  font: defaultFont,
  x: calcPt(30),
  y: calcPt(11),
  size: calcPt(3),
});
page.drawText("This code is written by deno (https://deno.com/)", {
  font: defaultFont,
  x: calcPt(7),
  y: calcPt(7.5),
  size: calcPt(3),
});
page.drawText("Wishing you all the best in the new year!", {
  font: defaultFont,
  x: calcPt(7),
  y: calcPt(4),
  size: calcPt(3),
});
page.drawText("https://github.com/emp-temp/HappyNewYearCards-2024", {
  font: defaultFont,
  x: calcPt(45),
  y: calcPt(1.5),
  size: calcPt(2),
});

const denoPicture = await Deno.readFile("deno_kun.png");
const denoImage = await pdfDoc.embedPng(denoPicture);
const denoDims = denoImage.scale(0.3);

page.drawImage(denoImage, {
  x: page.getWidth() / 2 - denoDims.width / 2 - 90,
  y: page.getHeight() / 2 - denoDims.height / 2 + 120,
  width: denoDims.width,
  height: denoDims.height,
});

const deno2Picture = await Deno.readFile("deno2.png");
const deno2Image = await pdfDoc.embedPng(deno2Picture);
const deno2Dims = deno2Image.scale(0.1);

page.drawImage(deno2Image, {
  x: page.getWidth() / 2 - deno2Dims.width / 2 + 90,
  y: page.getHeight() / 2 - deno2Dims.height / 2 - 120,
  width: deno2Dims.width,
  height: deno2Dims.height,
});


const pdfBytes = await pdfDoc.save();
await Deno.writeFile("./NewYearCard.pdf", pdfBytes);
console.log("PDF file written to ./NewYearCard.pdf");
