import { z } from 'zod';

import { ECurrency } from '@/constants/misc';
import EErrorMessages from '@/constants/validation-messages';

export const UserSettingsSchema = z.object({
  apiKey: z.string().min(1, { message: EErrorMessages.empty }),
  currency: z.enum([ECurrency.EUR, ECurrency.USD])
});

export type TUserSettings = z.infer<typeof UserSettingsSchema>;
