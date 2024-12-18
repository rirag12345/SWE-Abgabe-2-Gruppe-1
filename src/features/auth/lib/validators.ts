import { z } from 'zod';

export const EmailSchema = z
  .string()
  .email({ message: 'Ungültiges E-Mail-Format' });
export const PasswordSchema = z
  .string()
  .min(1, { message: 'Passwort muss mindestens 6 Zeichen lang sein' });
