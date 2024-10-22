import type { NextFunction, Request, Response } from 'express';
import { type AnyZodObject, z } from 'zod';

const validate =
  (schema: AnyZodObject) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.parseAsync({
        body: req.body,
        query: req.query,
        params: req.params,
      });
      next();
    } catch (error) {
      if (error instanceof z.ZodError) {
        const formattedErrors = error.issues.map((issue) => ({
          path: issue.path.join('.'),
          message: issue.message,
        }));
        res.status(400).json({
          message: 'Validation error',
          errors: formattedErrors,
        });
      } else {
        res.status(500).json({ message: 'Internal server error' });
      }
    }
  };

export default validate;
