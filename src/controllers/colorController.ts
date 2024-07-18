import { Request, Response } from 'express';

const hexToRgb = (hex: string) => {
  const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
  hex = hex.replace(shorthandRegex, (m, r, g, b) => r + r + g + g + b + b);

  const regex = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i;
  const result = regex.exec(hex);
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : null;
};

const rgbToHex = (r: number, g: number, b: number) => {
  return `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1).toUpperCase()}`;
};

export const convertColor = (req: Request, res: Response) => {
  const { color, format } = req.body;
  
  try {
    let convertedColor: string | null = null;

    if (format.toLowerCase() === 'rgb' && /^#([0-9A-F]{3}){1,2}$/i.test(color)) {
      const rgb = hexToRgb(color);
      if (rgb) {
        convertedColor = `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`;
      }
    } else if (format.toLowerCase() === 'hex' && /^(rgb|RGB)\((\d{1,3}), (\d{1,3}), (\d{1,3})\)$/.test(color)) {
      const result = color.match(/\d+/g);
      if (result && result.length === 3) {
        const [r, g, b] = result.map(Number);
        convertedColor = rgbToHex(r, g, b);
      }
    }

    if (convertedColor) {
      res.status(200).json({ convertedColor });
    } else {
      res.status(400).json({ message: 'Invalid color format or conversion type' });
    }
  } catch (error) {
    console.error('Error converting color:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
