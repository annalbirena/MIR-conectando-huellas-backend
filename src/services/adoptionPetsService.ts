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

  static async getAdoptionPetsByFilters(
    sex: string | undefined,
    size: string | undefined,
    specieId: string | undefined,
  ) {
    // creamos arrays con los valores de los filtros
    const mulSex = sex?.split(',');
    const mulSize = size?.split(',');
    const mulSpecieId = specieId?.split(',');
    // creamos variables para agregarlos en el where
    const whereClauseSex: any = [];
    const whereClauseSize: any = [];
    const whereClauseSpecieId: any = [];
    // si el valor no es undefined lo agrega al array
    if (sex !== 'undefined') {
      mulSex?.forEach((element) => {
        whereClauseSex.push({ pet: { sex: element } });
      });
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
    const adoptionPets = await prisma.adoptionPets.findMany({
      where: {
        AND: [
          { OR: whereClauseSex },
          { OR: whereClauseSize },
          { OR: whereClauseSpecieId },
        ],
      }, // Apply the constructed where clause
      include: { pet: true, user: true, contact: true }, // Include relationships
    });

    return adoptionPets;
  }
}
