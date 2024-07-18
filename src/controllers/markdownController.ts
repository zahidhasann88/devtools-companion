import { Request, Response } from 'express';
import { marked } from 'marked';

export const renderMarkdown = (req: Request, res: Response) => {
  const { markdown } = req.body;
  try {
    const html = marked.parse(markdown);
    res.status(200).json({ html });
  } catch (error) {
    res.status(500).json({ message: 'Error rendering markdown' });
  }
};
