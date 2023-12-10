import { useQuery } from '@tanstack/react-query';

import { OPTIONS, URLS } from '@/constants/coin-market-cap-api';
import { IPurchase } from '@/interfaces/i-purchase';

export default function useGetTokensSymbol(
  apiKey: string,
  purchaseList: IPurchase[],
  enabled: boolean
) {
  return useQuery({
    queryKey: ['tokens-symbol', purchaseList],
    queryFn: async () => {
      const tokensSymbol: string[] = [];

      const response = await fetch(URLS.tokensSymbol, {
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
        Array.isArray(resultJSON.data)
      ) {
        for (const purchase of purchaseList) {
          for (const result of resultJSON.data) {
            if (
              result !== null &&
              result !== undefined &&
              typeof result === 'object' &&
              'name' in result &&
              typeof result.name === 'string' &&
              'symbol' in result &&
              typeof result.symbol === 'string' &&
              result.name === purchase.tokenName
            ) {
              tokensSymbol.push(result.symbol);
            }
          }
        }
      }

      console.log('tokensSymbol', tokensSymbol);

      return tokensSymbol;
    },
    enabled,
    staleTime: Number.POSITIVE_INFINITY
  });
}
