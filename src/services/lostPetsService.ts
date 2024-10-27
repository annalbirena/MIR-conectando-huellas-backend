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
    const contactResponse = await prisma.contacts.create({
      data: {
        name: contact.name,
        phone: contact.phone,
        address: contact.address,
      },
    });

    if (!contactResponse) {
      throw new Error('Error al crear contacto de mascota');
    }

    const petResponse = await prisma.pets.create({
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

    if (!petResponse) {
      throw new Error('Error al crear mascota');
    }

    return prisma.lostPets.create({
      data: {
        lostDate: pet.lostDate,
        statusLost: pet.state,
        description: pet.description,
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
  ) {
    const whereClause: any = {}; // Initialize an empty where clause
    if (sex !== 'undefined') {
      whereClause.pet = { sex };
    }
    if (size !== 'undefined') {
      whereClause.pet = { size };
    }
    if (specieId !== 'undefined') {
      whereClause.pet = { specieId };
    }
    console.log(whereClause);
    const lostPets = await prisma.lostPets.findMany({
      where: whereClause, // Apply the constructed where clause
      include: { pet: true, user: true, contact: true }, // Include relationships
    });

    return lostPets;
  }
}
