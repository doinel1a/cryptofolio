/* eslint-disable @typescript-eslint/ban-ts-comment */

import type IAPITokenPrice from '@/interfaces/i-api-token-price';

import { useQuery } from '@tanstack/react-query';

import { OPTIONS, URLS } from '@/constants/coin-market-cap-api';
import { type ECurrency } from '@/constants/misc';
import { roundDecimal } from '@/lib/utils';

export default function useGetTokensPrice(
  apiKey: string,
  currency: ECurrency,
  tokensSymbol: string[] | undefined,
  refetchInterval: number,
  enabled: boolean
) {
  return useQuery({
    queryKey: ['tokens-price', tokensSymbol],
    queryFn: async () => {
      const tokensPrice: IAPITokenPrice[] = [];

      const response = await fetch(URLS.tokensData(tokensSymbol ?? [], currency), {
        method: OPTIONS.method,
        headers: OPTIONS.headers(apiKey)
      });

      if (!response.ok) {
        throw new Error(response.statusText);
      }

      const resultJSON = await response.json();

      if (
        resultJSON !== null &&
        resultJSON !== undefined &&
        typeof resultJSON === 'object' &&
        'data' in resultJSON &&
        resultJSON.data !== null &&
        resultJSON.data !== undefined &&
        typeof resultJSON.data === 'object'
      ) {
        for (const result of Object.values(resultJSON.data)) {
          const data = Array.isArray(result) ? result[0] : [];

          /*
            Possible solution to remove the ts-ignore(s)
            https://chat.openai.com/c/c4e190e5-628e-4872-be72-21651397b008
          */
          if (
            data !== null &&
            data !== undefined &&
            typeof data === 'object' &&
            'id' in data &&
            typeof data.id === 'number' &&
            'quote' in data &&
            data.quote !== null &&
            data.quote !== undefined &&
            typeof data.quote === 'object' &&
            currency in data.quote &&
            // @ts-ignore
            data.quote[currency] !== null &&
            // @ts-ignore
            data.quote[currency] !== undefined &&
            // @ts-ignore
            typeof data.quote[currency] === 'object' &&
            // @ts-ignore
            'price' in data.quote[currency] &&
            // @ts-ignore
            // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
            typeof data.quote[currency].price === 'number'
          ) {
            tokensPrice.push({
              id: data.id,
              // @ts-ignore
              // eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-member-access
              currentPrice: roundDecimal(data.quote[currency].price, 5)
            });
          }
        }
      }

      console.log('tokensPrice', tokensPrice);

      return tokensPrice;
    },
    enabled,
    refetchInterval
  });
}
