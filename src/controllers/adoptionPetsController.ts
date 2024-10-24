import { NextFunction, Request, Response } from 'express';
import { AdoptionPetsService } from '../services/adoptionPetsService';

export class AdoptionPetsController {
  static async getAdoptionPets(_: Request, res: Response, next: NextFunction) {
    try {
      const pets = await AdoptionPetsService.getAdoptionPets();

      if (!pets) {
        res.status(404).json({ error: 'No hay mascotas en adopción' });
        return;
      }
      res.json(pets);
    } catch (error) {
      next(error);
    }
  }

  static async getAdoptionPetById(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    const { id } = req.params;

    try {
      const pet = await AdoptionPetsService.getAdoptionPetById(id);

      if (!pet) {
        res.status(404).json({ error: 'Mascota no encontrada' });
        return;
      }
      res.json(pet);
    } catch (error) {
      next(error);
    }
  }

  static async createAdoptionPet(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    const { pet, contact, userId } = req.body;

    try {
      const specie = await AdoptionPetsService.createAdoptionPet({
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
