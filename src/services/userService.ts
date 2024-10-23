import prisma from './prisma';
import {
  hashPassword,
  generateVerificationToken,
  sendAccountConfirmationEmail,
} from '../utils';

type CreateUserData = {
  name: string;
  email: string;
  phone: string;
  address: string;
  password: string;
};

type UpdateUserData = {
  name: string;
  email: string;
  phone: string;
  address: string;
};

export class UserService {
  static async getUserById(id: string) {
    return prisma.users.findUnique({
      where: { id },
    });
  }

  static async getUserByEmail(email: string) {
    return prisma.users.findUnique({
      where: { email },
    });
  }

  static async createUser({
    name,
    email,
    phone,
    address,
    password,
  }: CreateUserData) {
    const userExists = await this.getUserByEmail(email);

    if (userExists) {
      throw new Error('Ya existe un usuario con ese correo electrónico');
    }

    try {
      return prisma.$transaction(async (prismaTx) => {
        const hashedPassword = await hashPassword(password);

        const user = await prismaTx.users.create({
          data: {
            name,
            email,
            phone,
            address,
            passwordHash: hashedPassword,
            verificationToken: generateVerificationToken(),
          },
        });

        // Envio de correo de verificación
        if (user.verificationToken) {
          await sendAccountConfirmationEmail(
            user.email,
            user.verificationToken,
          );
        } else {
          throw new Error('Verification token is null');
        }

        return user;
      });
    } catch (error) {
      throw new Error('No se pudo crear el usuario');
    }
  }

  static async updateUser(
    id: string,
    { name, email, phone, address }: UpdateUserData,
  ) {
    const userExists = await this.getUserById(id);

    if (!userExists) {
      throw new Error('No existe un usuario con ese ID');
    }

    const userWithSameEmail = await this.getUserByEmail(email);

    if (userWithSameEmail && userWithSameEmail.id !== id) {
      throw new Error('Ya existe un usuario con ese correo electrónico');
    }

    return prisma.users.update({
      where: { id },
      data: { name, phone, address },
    });
  }

  static async verifyAccount(token: string) {
    const user = await prisma.users.findFirst({
      where: { verificationToken: token },
    });

    if (!user) {
      throw new Error('Token de verificación inválido');
    }

    return prisma.users.update({
      where: { id: user.id },
      data: {
        isVerified: true,
        verificationToken: null,
      },
    });
  }

  static async updatePassword(id: string, password: string) {
    const userExists = await this.getUserById(id);

    if (!userExists) {
      throw new Error('No existe un usuario con ese ID');
    }

    const hashedPassword = await hashPassword(password);

    return prisma.users.update({
      where: { id },
      data: {
        passwordHash: hashedPassword,
      },
    });
  }

  static async activateUser(id: string) {
    const userExists = await this.getUserById(id);

    if (!userExists) {
      throw new Error('No existe un usuario con ese ID');
    }

    return prisma.users.update({
      where: { id },
      data: {
        isDeleted: false,
      },
    });
  }

  static async deactivateUser(id: string) {
    const userExists = await this.getUserById(id);

    if (!userExists) {
      throw new Error('No existe un usuario con ese ID');
    }

    return prisma.users.update({
      where: { id },
      data: {
        isDeleted: true,
      },
    });
  }

  static async deleteUser(id: string) {
    const userExists = await this.getUserById(id);

    if (!userExists) {
      throw new Error('No existe un usuario con ese ID');
    }

    try {
      return prisma.$transaction(async (prismaTx) => {
        const user = await prismaTx.users.delete({
          where: { id },
        });

        return user;
      });
    } catch (error) {
      throw new Error('No se pudo eliminar el usuario');
    }
  }
}
