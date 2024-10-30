import prisma from './prisma';

type LostPetData = {
  pet: {
    name: string;
    specie: string;
    age: {
      number: number;
      type: string;
    };
    sex: string;
    breed?: string;
    size: string;
    lostDate: string;
    location: {
      latitude: number;
      longitude: number;
    };
    state: boolean;
    image: string;
    description: string;
  };
  contact: {
    name: string;
    phone: string;
    address: string;
  };
  userId: string;
};

export class LostPetsService {
  static async getLostPets() {
    return prisma.lostPets.findMany({
      include: { pet: true, user: true, contact: true },
      orderBy: {
        lostDate: 'desc',
      },
    });
  }

  static async getLostPetById(id: string) {
    return prisma.lostPets.findUnique({
      where: { id },
      include: { pet: true, user: true, contact: true },
    });
  }

  static async getLostPetsByUserId(userId: string) {
    return await prisma.lostPets.findMany({
      where: {
        userId: userId,
      },
      include: {
        pet: true,
        contact: true,
      },
      orderBy: {
        updatedAt: 'desc',
      },
    });
  }

  static async createLostPet({ pet, contact, userId }: LostPetData) {
    const contactParse = JSON.parse(contact);
    const contactResponse = await prisma.contacts.create({
      data: {
        name: contactParse.name,
        phone: contactParse.phone,
        address: contactParse.address,
      },
    });

    if (!contactResponse) {
      throw new Error('Error al crear contacto de mascota');
    }

    const petParse = JSON.parse(pet);
    const petResponse = await prisma.pets.create({
      data: {
        name: petParse.name,
        ageUnit: petParse.age.type,
        age: Number(petParse.age.number),
        sex: petParse.sex,
        breed: petParse.breed,
        size: petParse.size,
        image: petParse.image,
        location_latitude: petParse.location.latitude,
        location_longitude: petParse.location.longitude,
        specieId: petParse.specie,
      },
    });

    if (!petResponse) {
      throw new Error('Error al crear mascota');
    }

    return prisma.lostPets.create({
      data: {
        lostDate: petParse.lostDate,
        statusLost: petParse.state,
        description: petParse.description,
        petId: petResponse.id,
        userId: userId,
        contactId: contactResponse.id,
      },
      include: { pet: true },
    });
  }

  static async updateLostPet(id: string, { pet, contact }: LostPetData) {
    // Validar si la mascota existe
    const petsExists = await this.getLostPetById(id);

    if (!petsExists) {
      throw new Error('No existe una mascota con ese ID');
    }

    // Validar si la especia existe
    if (pet.specie) {
      const specieExists = await prisma.species.findUnique({
        where: { id: pet.specie },
      });

      if (!specieExists) {
        throw new Error('No existe una especia con ese ID');
      }
    }

    const lostPetResponse = await prisma.lostPets.update({
      where: { id },
      data: {
        lostDate: pet.lostDate,
        statusLost: pet.state,
        description: pet.description,
      },
    });

    if (!lostPetResponse) {
      throw new Error('Error al actualizar mascota perdida');
    }

    const contactResponse = await prisma.contacts.update({
      where: { id: lostPetResponse.contactId },
      data: {
        name: contact.name,
        phone: contact.phone,
        address: contact.address,
      },
    });

    if (!contactResponse) {
      throw new Error('Error al actualizar datos de contacto');
    }

    return prisma.pets.update({
      where: { id: lostPetResponse.petId },
      data: {
        name: pet.name,
        ageUnit: pet.age.type,
        age: Number(pet.age.number),
        sex: pet.sex,
        breed: pet.breed,
        size: pet.size,
        image: pet.image,
        location_latitude: pet.location.latitude,
        location_longitude: pet.location.longitude,
        specieId: pet.specie,
      },
    });
  }

  static async getLostPetsByFilters(
    sex: string | undefined,
    size: string | undefined,
    specieId: string | undefined,
    lostDateMin: string | 'undefined',
    lostDateMax: string | 'undefined',
  ) {
    const mulSex = sex?.split(',');
    const mulSize = size?.split(',');
    const mulSpecieId = specieId?.split(',');

    const whereClauseSex: any = [];
    const whereClauseSize: any = [];
    const whereClauseSpecieId: any = [];
    const whereClauseLostDate: any = {}; // Initialize an empty where clause
    if (sex !== 'undefined') {
      console.log(mulSex);
      mulSex?.forEach((element) => {
        whereClauseSex.push({ pet: { sex: element } });
      });
      console.log(whereClauseSex);
    }

    if (size !== 'undefined') {
      mulSize?.forEach((element) => {
        whereClauseSize.push({ pet: { size: element } });
      });
    }

    if (specieId !== 'undefined') {
      mulSpecieId?.forEach((element) => {
        whereClauseSpecieId.push({ pet: { specieId: element } });
      });
    }
    if (lostDateMin !== 'undefined' || lostDateMax !== 'undefined') {
      whereClauseLostDate.lostDate = {
        gte: new Date(lostDateMin).toISOString(),
        lte: new Date(lostDateMax).toISOString(),
      };
    }
    console.log(whereClauseLostDate);
    if (
      whereClauseSex == undefined &&
      whereClauseSize == undefined &&
      whereClauseSpecieId == undefined &&
      whereClauseLostDate == undefined
    ) {
      return [];
    } else {
      return await prisma.lostPets.findMany({
        where: {
          AND: [
            whereClauseLostDate,
            {
              AND: [
                { OR: whereClauseSex },
                { OR: whereClauseSize },
                { OR: whereClauseSpecieId },
              ],
            },
          ],
        }, // Apply the constructed where clause
        include: { pet: true, user: true, contact: true }, // Include relationships
      });
    }
  }
}
