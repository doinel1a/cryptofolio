import { z } from 'zod';

export const StakeSchema = z.object({
  tokenName: z.string(),
  providerName: z.string(),
  quantity: z.string(),
  apr: z.string(),
  apy: z.string()
});

export type TStake = z.infer<typeof StakeSchema>;
