import { z } from 'zod';

export const SignInSchema = z.object({
    email: z.string().email({ message: 'Ungültiges E-Mail-Format' }),
    password: z
        .string()
        .min(1, { message: 'Passwort muss mindestens 1 Zeichen lang sein' }),
});

export const SearchCriteriaSchema = z.object({
    isbn: z
        .string()
        .optional()
        .refine(
            (val) =>
                val !== undefined &&
                (val === '' || val.length === 10 || val.length === 13),
            {
                message: 'ISBN muss entweder 10 oder 13 Zeichen lang sein',
            },
        ),
    title: z
        .string()
        .max(20, 'Titel darf maximal 20 Zeichen lang sein')
        .optional(),
    rating: z
        .string()
        .optional()
        .refine(
            (val) =>
                val === '' ||
                (!isNaN(Number(val)) && Number(val) >= 0 && Number(val) <= 5),
            {
                message: 'Rating muss eine Zahl zwischen 0 und 5 sein',
            },
        ),
    tsChecked: z.boolean(),
    jsChecked: z.boolean(),
    format: z.string().optional(),
});

export const CreateSchema = z.object({
    // TODO Korrektheit überprüfen
    isbn: z.string().regex(/^(?:\d{13}|\d{3}(?:-\d{1,5}){3}-\d{1})$/, {
        message: 'Ungültige ISBN-13',
    }),
    rating: z
        .string()
        .refine((val) => !isNaN(Number(val)), {
            message: 'Rating muss eine Zahl sein',
        })
        .transform((val) => Number(val))
        .refine((val) => val >= 0 && val <= 5 && Number.isInteger(val), {
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
