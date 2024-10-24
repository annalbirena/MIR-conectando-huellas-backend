import { NextFunction, Request, Response } from 'express';
import { LostPetsService } from '../services/lostPetsService';

export class LostPetsController {
  static async getLostPets(_: Request, res: Response, next: NextFunction) {
    try {
      const pets = await LostPetsService.getLostPets();

      if (!pets) {
        res.status(404).json({ error: 'No hay mascotas perdidas' });
        return;
      }
      res.json(pets);
    } catch (error) {
      next(error);
    }
  }

  static async getLostPetById(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;

    try {
      const pet = await LostPetsService.getLostPetById(id);

      if (!pet) {
        res.status(404).json({ error: 'Mascota no encontrada' });
        return;
      }
      res.json(pet);
    } catch (error) {
      next(error);
    }
  }

  static async createLostPet(req: Request, res: Response, next: NextFunction) {
    const { pet, contact, userId } = req.body;

    try {
      const specie = await LostPetsService.createLostPet({
        pet,
        contact,
        userId,
      });
      res.json(specie);
    } catch (error) {
      next(error);
    }
  }
}
