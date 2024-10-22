import prisma from './prisma';

export class PetsService {
  static async getPets() {
    return prisma.pets.findMany({
      include: {
        breed: true,
        specie: true,
      },
    });
  }
}
