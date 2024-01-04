export const drawVertical = (
  page: any,
  text: string,
  font: any,
  x: number,
  y: number,
  size: number,
) => {
  const textHeight = text.length * font.heightAtSize(size);
  for (let i = 0; i < text.length; i++) {
    page.drawText(text.at(i), {
      font: font,
      x: x,
      y: y + textHeight - i * font.heightAtSize(size),
      size: size,
    });
  }
};
