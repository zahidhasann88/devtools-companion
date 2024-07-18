import { Request, Response, NextFunction } from 'express';
import { check, validationResult } from 'express-validator';

export const validateColorConversion = [
  check('color').isString().notEmpty(),
  check('format').isIn(['hex', 'rgb']),
  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  }
];
