import { z } from 'zod';

import EErrorMessages from '@/constants/validation-messages';

export const PurchaseSchema = z.object({
  tokenName: z
    .string()
    .min(1, { message: EErrorMessages.empty })
    .refine((value) => /^[A-Za-z]+( [A-Za-z]+)*$/.test(value), {
      message: EErrorMessages.invalidString
    }),
  unitPrice: z
    .string()
    .min(1, { message: EErrorMessages.empty })
    .refine((value) => /^\d+(\.\d+)?$/.test(value), { message: EErrorMessages.invalidNumber }),
  quantity: z
    .string()
    .min(1, { message: EErrorMessages.empty })
    .refine((value) => /^\d+(\.\d+)?$/.test(value), { message: EErrorMessages.invalidNumber }),
  date: z.date({
    required_error: EErrorMessages.empty,
    invalid_type_error: EErrorMessages.invalidDate
  })
});

export type TPurchase = z.infer<typeof PurchaseSchema>;
