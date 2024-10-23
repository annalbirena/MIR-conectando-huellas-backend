import { body, param } from 'express-validator';

// Se utiliza para GET
export const emailGetValidator = param('email')
  .exists()
  .withMessage('El correo electrónico es requerido')
  .isString()
  .withMessage('El correo electrónico debe ser válido')
  .isLength({ max: 50 })
  .withMessage('El correo electrónico debe tener máximo 50 caracteres')
  .isEmail()
  .withMessage('El correo electrónico debe ser un email válido');

// Se utiliza para POST
export const emailValidator = body('email')
  .exists()
  .withMessage('El correo electrónico es requerido')
  .isString()
  .withMessage('El correo electrónico debe ser válido')
  .isLength({ max: 50 })
  .withMessage('El correo electrónico debe tener máximo 50 caracteres')
  .isEmail()
  .withMessage('El correo electrónico debe ser un email válido');

export const passwordValidator = body('password')
  .exists()
  .withMessage('La contraseña es requerida')
  .isString()
  .withMessage('La contraseña debe ser válida')
  .isLength({ min: 8, max: 25 })
  .withMessage('La contraseña debe tener entre 8 y 25 caracteres')
  .matches(/^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*_])/)
  .withMessage(
    'La contraseña debe contener al menos una letra mayúscula, un número y un carácter especial.',
  );
