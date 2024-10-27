import prisma from './prisma';

type AdoptionPetData = {
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

export class AdoptionPetsService {
  static async getAdoptionPets() {
    return prisma.adoptionPets.findMany({
      include: { pet: true, user: true, contact: true },
    });
  }

  static async getAdoptionPetById(id: string) {
    return prisma.adoptionPets.findUnique({
      where: { id },
      include: { pet: true, user: true, contact: true },
    });
  }

  static async getAdoptionPetsByUserId(userId: string) {
    return await prisma.adoptionPets.findMany({
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

  static async createAdoptionPet({ pet, contact, userId }: AdoptionPetData) {
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

    return prisma.adoptionPets.create({
      data: {
        statusAdopt: pet.state,
        description: pet.description,
        petId: petResponse.id,
        userId: userId,
        contactId: contactResponse.id,
      },
      include: { pet: true },
    });
  }

  static async updateAdoptionPet(
    id: string,
    { pet, contact }: AdoptionPetData,
  ) {
    // Validar si la mascota existe
    const petsExists = await this.getAdoptionPetById(id);

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

    const adoptionPetResponse = await prisma.adoptionPets.update({
      where: { id },
      data: {
        statusAdopt: pet.state,
        description: pet.description,
      },
    });

    if (!adoptionPetResponse) {
      throw new Error('Error al actualizar mascota en adopcion');
    }

    const contactResponse = await prisma.contacts.update({
      where: { id: adoptionPetResponse.contactId },
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
      where: { id: adoptionPetResponse.petId },
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

  static async getAdoptionPetsByFilters(
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
    const adoptionPets = await prisma.adoptionPets.findMany({
      where: whereClause, // Apply the constructed where clause
      include: { pet: true, user: true, contact: true }, // Include relationships
    });

    return adoptionPets;
  }
}
