import { useQuery } from '@tanstack/react-query';

import { OPTIONS, URLS } from '@/constants/coin-market-cap-api';
import IAPITokenMetadata from '@/interfaces/i-api-token-metadata';

export default function useGetTokensMetadata(
  apiKey: string,
  tokensSymbol: string[] | undefined,
  enabled: boolean
) {
  return useQuery({
    queryKey: ['tokens-metadata', tokensSymbol],
    queryFn: async () => {
      const tokensMetadata: IAPITokenMetadata[] = [];

      const response = await fetch(URLS.tokensMetadata(tokensSymbol || []), {
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
            'name' in data &&
            typeof data.name === 'string' &&
            'symbol' in data &&
            typeof data.symbol === 'string' &&
            'logo' in data &&
            typeof data.logo === 'string'
          ) {
            tokensMetadata.push({
              id: data.id,
              name: data.name,
              symbol: data.symbol,
              logoURL: data.logo
            });
          }
        }
      }
      console.log('tokensMetadata', tokensMetadata);

      return tokensMetadata;
    },
    enabled,
    staleTime: Number.POSITIVE_INFINITY
  });
}
