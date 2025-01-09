import { z } from 'zod';

export const SignInSchema = z.object({
    email: z
        .string()
        .toLowerCase()
        .trim()
        .email({ message: 'Ungültiges E-Mail-Format' }),
    password: z.string().trim().min(1, {
        message:
            'Passwort muss mindestens 1 Zeichen lang sein und darf nicht leer sein',
    }),
});

export const CreateSchema = z.object({
    isbn: z.string().regex(/^(?:\d{13}|\d{3}(?:-\d{1,5}){3}-\d{1})$/, {
        message: 'Ungültige ISBN-13',
    }),
    rating: z
        .string()
        .refine((val) => !isNaN(Number(val)), {
            message: 'Rating muss eine Zahl sein',
        })
        .transform((val) => Number(val))
        .refine((val) => Number.isInteger(val), {
            message: 'Rating muss eine ganze Zahl sein',
        })
        .refine((val) => val >= 0 && val <= 5, {
            message: 'Rating muss zwischen 0 und 5 liegen',
        }),
    preis: z
        .string()
        .refine((val) => !isNaN(Number(val)), {
            message: 'Preis muss eine Zahl sein',
        })
        .transform((val) => Number(val))
        .refine((val) => val > 0, {
            message: 'Preis muss positiv sein',
        }),
    rabatt: z
        .string()
        .refine((val) => !isNaN(Number(val)), {
            message: 'Rabatt muss eine Zahl sein',
        })
        .transform((val) => Number(val))
        .refine((val) => val >= 0 && val <= 1, {
            message: 'Rabatt muss zwischen 0 und 1 liegen',
        }),
    titel: z
        .string()
        .regex(/^\w.*/, {
            message: 'Titel muss mit einem Buchstaben beginnen',
        })
        .max(40, { message: 'Titel darf höchstens 40 Zeichen lang sein' }),
});
