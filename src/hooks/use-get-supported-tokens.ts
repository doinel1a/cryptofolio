import { useQuery } from '@tanstack/react-query';

import { OPTIONS, URLS } from '@/constants/coingecko-api';
import IAPISupportedToken from '@/interfaces/i-api-supported-token';
import { IPurchase } from '@/interfaces/i-purchase';

export default function useGetSupportedTokens(
  purchaseList: IPurchase[],
  enabled: boolean,
  refetchInterval: number
) {
  return useQuery({
    queryKey: ['supported-tokens', purchaseList.length],
    queryFn: async () => {
      const supportedTokens: IAPISupportedToken[] = [];

      const response = await fetch(URLS.supportedTokens, OPTIONS);

      if (!response.ok) {
        throw new Error(response.statusText);
      }

      const resultJSON = await response.json();

      if (
        resultJSON !== null &&
        resultJSON !== undefined &&
        Array.isArray(resultJSON) &&
        resultJSON.length > 0
      ) {
        for (const purchase of purchaseList) {
          for (const result of resultJSON) {
            if (
              result !== null &&
              result !== undefined &&
              typeof result === 'object' &&
              'id' in result &&
              typeof result.id === 'string' &&
              'symbol' in result &&
              typeof result.symbol === 'string' &&
              'name' in result &&
              typeof result.name === 'string' &&
              purchase.tokenName === result.name
            ) {
              supportedTokens.push({
                id: result.id,
                symbol: result.symbol,
                name: result.name
              });
            }
          }
        }
      }

      return supportedTokens;
    },
    enabled,
    refetchInterval
  });
}
