import prisma from './prisma';

export interface SpecieData {
  name: string;
}

export class SpecieService {
  static async getSpecies() {
    return prisma.species.findMany({ include: { pets: true } });
  }

  static async getSpecieById(id: string) {
    return prisma.species.findUnique({
      where: { id },
      include: { pets: true },
    });
  }

  static async getSpecieByName(name: string) {
    return prisma.species.findUnique({
      where: { name },
    });
  }

  static async createSpecie({ name }: SpecieData) {
    const specieExists = await this.getSpecieByName(name);

    if (specieExists) {
      throw new Error('Ya existe una especie con ese nombre');
    }

    return prisma.species.create({
      data: { name },
    });
  }

  static async updateSpecie(id: string, { name }: SpecieData) {
    const specieExists = await this.getSpecieById(id);

    if (!specieExists) {
      throw new Error('No existe una especie con ese ID');
    }

    const specieNameExists = await this.getSpecieByName(name);

    if (specieNameExists && specieNameExists?.id !== id) {
      throw new Error('Ya existe una especie con ese nombre');
    }

    return prisma.species.update({
      where: { id },
      data: { name },
    });
  }

  static async activateSpecie(id: string) {
    const specieExists = await this.getSpecieById(id);

    if (!specieExists) {
      throw new Error('No existe una especie con ese ID');
    }

    return prisma.species.update({
      where: { id },
      data: { isDeleted: false },
    });
  }

  static async deactivateSpecie(id: string) {
    const specieExists = await this.getSpecieById(id);

    if (!specieExists) {
      throw new Error('No existe una especie con ese ID');
    }

    return prisma.$transaction(async (prismaTx) => {
      try {
        // Desactivar las mascotas relacionadas
        await prismaTx.pets.updateMany({
          where: { specieId: id },
          data: { isDeleted: true },
        });

        return prismaTx.species.update({
          where: { id },
          data: { isDeleted: true },
        });
      } catch (error) {
        throw new Error('No se pudo desactivar la especie');
      }
    });
  }

  static async deleteSpecie(id: string) {
    const specieExists = await this.getSpecieById(id);

    if (!specieExists) {
      throw new Error('No existe una especie con ese ID');
    }

    return prisma.species.delete({
      where: { id },
    });
  }
}
