import { z } from 'zod';

export const EmailSchema = z
    .string()
    .email({ message: 'Ungültiges E-Mail-Format' });
export const PasswordSchema = z
    .string()
    .min(1, { message: 'Passwort muss mindestens 6 Zeichen lang sein' });

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
