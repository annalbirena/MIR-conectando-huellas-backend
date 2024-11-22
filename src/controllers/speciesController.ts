import { NextFunction, Request, Response } from 'express';
import { SpecieService } from '../services/speciesService';

export class SpecieController {
  static async getSpecies(_: Request, res: Response, next: NextFunction) {
    try {
      const species = await SpecieService.getSpecies();

      if (!species) {
        res.status(404).json({ error: 'No hay especies' });
        return;
      }
      res.json(species);
    } catch (error) {
      next(error);
    }
  }

  static async getSpecieById(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;

    try {
      const specie = await SpecieService.getSpecieById(id);

      if (!specie) {
        res.status(404).json({ error: 'Especie no encontrada' });
        return;
      }
      res.json(specie);
    } catch (error) {
      next(error);
    }
  }

  static async createSpecie(req: Request, res: Response, next: NextFunction) {
    const { name } = req.body;

    try {
      const specie = await SpecieService.createSpecie({
        name,
      });
      res.json(specie);
    } catch (error) {
      next(error);
    }
  }

  static async updateSpecie(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;
    const { name } = req.body;

    try {
      const specie = await SpecieService.updateSpecie(id, {
        name,
      });
      res.json(specie);
    } catch (error) {
      next(error);
    }
  }

  static async activateSpecie(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;

    try {
      const specie = await SpecieService.activateSpecie(id);
      res.json(specie);
    } catch (error) {
      next(error);
    }
  }

  static async deactivateSpecie(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    const { id } = req.params;

    try {
      const specie = await SpecieService.deactivateSpecie(id);
      res.json(specie);
    } catch (error) {
      next(error);
    }
  }

  static async deleteSpecie(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;

    try {
      const specie = await SpecieService.deleteSpecie(id);
      res.json(specie);
    } catch (error) {
      next(error);
    }
  }
}
