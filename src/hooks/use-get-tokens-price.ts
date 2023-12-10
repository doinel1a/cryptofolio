import { useQuery } from '@tanstack/react-query';

import { OPTIONS, URLS } from '@/constants/coin-market-cap-api';
import IAPITokenPrice from '@/interfaces/i-api-token-price';
import { roundDecimal } from '@/lib/utils';

export default function useGetTokensPrice(
  apiKey: string,
  tokensSymbol: string[] | undefined,
  refetchInterval: number,
  enabled: boolean
) {
  return useQuery({
    queryKey: ['tokens-price', tokensSymbol],
    queryFn: async () => {
      const tokensPrice: IAPITokenPrice[] = [];

      const response = await fetch(URLS.tokensData(tokensSymbol || [], 'EUR'), {
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
            'EUR' in data.quote &&
            data.quote.EUR !== null &&
            data.quote.EUR !== undefined &&
            typeof data.quote.EUR === 'object' &&
            'price' in data.quote.EUR &&
            typeof data.quote.EUR.price === 'number'
          ) {
            tokensPrice.push({
              id: data.id,
              currentPrice: roundDecimal(data.quote.EUR.price, 2)
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
