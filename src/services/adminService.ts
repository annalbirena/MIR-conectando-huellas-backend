import prisma from './prisma';
import { hashPassword } from '../utils';

type UpdateAdminData = {
  name: string;
  email: string;
};

type CreateAdminData = UpdateAdminData & {
  password: string;
};

export class AdminService {
  static async getAdminById(id: string) {
    return prisma.admin.findUnique({
      where: { id },
    });
  }

  static async getAdminByEmail(email: string) {
    return prisma.admin.findUnique({
      where: { email },
    });
  }

  static async createAdmin({ name, email, password }: CreateAdminData) {
    const emailExists = await this.getAdminByEmail(email);

    if (emailExists) {
      throw new Error('Ya existe un administrador con ese correo electrónico');
    }

    const userEmailExists = await this.getAdminByEmail(email);

    if (userEmailExists) {
      throw new Error('Ya existe un administrador con ese correo');
    }

    const hashedPassword = await hashPassword(password);

    return prisma.admin.create({
      data: {
        name,
        email,
        passwordHash: hashedPassword,
      },
    });
  }

  static async updateAdmin(id: string, { name, email }: UpdateAdminData) {
    const adminExists = await this.getAdminById(id);

    if (!adminExists) {
      throw new Error('No existe un administrador con ese ID');
    }

    const adminWithSameEmail = await this.getAdminByEmail(email);

    if (adminWithSameEmail && adminWithSameEmail.id !== id) {
      throw new Error('Ya existe un administrador con ese correo electrónico');
    }

    return prisma.admin.update({
      where: { id },
      data: {
        name,
        email,
      },
    });
  }

  static async updatePassword(id: string, password: string) {
    const adminExists = await this.getAdminById(id);

    if (!adminExists) {
      throw new Error('No existe un administrador con ese ID');
    }

    const hashedPassword = await hashPassword(password);

    return prisma.admin.update({
      where: { id },
      data: {
        passwordHash: hashedPassword,
      },
    });
  }

  static async activateAdmin(id: string) {
    return prisma.admin.update({
      where: { id },
      data: {
        isDeleted: false,
      },
    });
  }

  static async deactivateAdmin(id: string) {
    const adminExists = await this.getAdminById(id);

    if (!adminExists) {
      throw new Error('No existe un administrador con ese ID');
    }

    return prisma.admin.update({
      where: { id },
      data: {
        isDeleted: true,
      },
    });
  }

  static async deleteAdmin(id: string) {
    const adminExists = await this.getAdminById(id);

    if (!adminExists) {
      throw new Error('No existe un administrador con ese ID');
    }

    return prisma.users.delete({
      where: { id },
    });
  }
}
