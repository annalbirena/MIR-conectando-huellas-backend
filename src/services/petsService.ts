import prisma from './prisma';

export class PetsService {
  static async getPets() {
    return prisma.pets.findMany({
      include: {
        specie: true,
      },
    });
  }
}
