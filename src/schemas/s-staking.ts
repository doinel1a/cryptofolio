import { z } from 'zod';

export const StakingSchema = z.object({
  name: z.string(),
  provider: z.string(),
  quantity: z.string(),
  apr: z.string(),
  apy: z.string()
});

export type TStaking = z.infer<typeof StakingSchema>;
