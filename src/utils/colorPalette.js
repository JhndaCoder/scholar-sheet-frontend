const getColorPalette = (numColors) => {
  const colors = [];
  const step = Math.floor(360 / numColors);

  for (let i = 0; i < numColors; i++) {
    const hue = (i * step) % 360;
    const saturation = 50 + (i % 3) * 10;
    const lightness = 70 + (i % 4) * 5;
    colors.push(`hsl(${hue}, ${saturation}%, ${lightness}%)`);
  }

  return colors;
};

export default getColorPalette;
