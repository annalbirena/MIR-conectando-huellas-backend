import type { Pets as PetsPrisma } from '@prisma/client';
import prisma from './prisma';

type Pets = PetsPrisma;

export async function getPets(): Promise<Pets[]> {
  const pets = await prisma.pets.findMany();
  return pets;
}

/* export class PetsService {
  static async getPets() {
    return prisma.pets.findMany({
      include: {
        breed: true,
        specie: true,
      },
    });
  }
} */
