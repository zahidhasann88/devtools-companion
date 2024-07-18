import { Request, Response } from 'express';

export const formatJson = (req: Request, res: Response) => {
  const { json } = req.body;
  try {
    const parsedJson = JSON.parse(json);
    const formattedJson = JSON.stringify(parsedJson, null, 2);
    res.status(200).json({ formattedJson });
  } catch (error) {
    res.status(400).json({ message: 'Invalid JSON' });
  }
};
