import { emailValidator, passwordValidator } from './base';

export const updateUserValidator = [emailValidator];

export const createUserValidator = [...updateUserValidator, passwordValidator];
