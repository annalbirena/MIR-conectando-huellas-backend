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

  static async getAdoptionPetsByUserId(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    const { userId } = req.params;

    try {
      const adoptionPets =
        await AdoptionPetsService.getAdoptionPetsByUserId(userId);

      if (!adoptionPets) {
        res.status(404).json({ error: 'No hay mascotas' });
        return;
      }

      res.json(adoptionPets);
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

  static async updateAdoptionPet(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const { id } = req.params;
      const data = req.body;

      const adoptionPet = await AdoptionPetsService.updateAdoptionPet(id, data);
      res.json(adoptionPet);
    } catch (error) {
      next(error);
    }
  }

  static async getAdoptionPetsByFilters(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    const { sex, size, specieId } = req.query;
    try {
      const adoptionPets = await AdoptionPetsService.getAdoptionPetsByFilters(
        String(sex),
        String(size),
        String(specieId),
      );
      res.json(adoptionPets);
    } catch (error) {
      next(error);
    }
  }
}
