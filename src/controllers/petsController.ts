import type { NextFunction, Request, Response } from 'express';
import { PetsService } from '../services/petsService';

/* export async function PetsController(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const pets = await getPets();

    if (!pets) {
      res.status(404).json({ error: 'No hay mascotas' });
      return;
    }

    res.json(pets);
  } catch (error) {
    next(error);
  }
} */

export class PetsController {
  static async getPets(_: Request, res: Response, next: NextFunction) {
    try {
      const pets = await PetsService.getPets();

      if (!pets) {
        res.status(404).json({ error: 'No hay mascotas' });
        return;
      }

      res.json(pets);
    } catch (error) {
      next(error);
    }
  }
}
