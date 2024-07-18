import { Request, Response } from 'express';

export const testRegex = (req: Request, res: Response) => {
  const { pattern, text } = req.body;
  try {
    const regex = new RegExp(pattern);
    const matches = text.match(regex);
    res.status(200).json({ matches });
  } catch (error) {
    res.status(400).json({ message: 'Invalid regex pattern' });
  }
};
