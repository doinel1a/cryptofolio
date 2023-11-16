import { z } from 'zod';

export const PurchasingSchema = z.object({
  name: z.string(),
  price: z.string(),
  quantity: z.string(),
  date: z.date()
});

export type TPurchasing = z.infer<typeof PurchasingSchema>;
