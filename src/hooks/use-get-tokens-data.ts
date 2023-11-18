import { useQueries } from '@tanstack/react-query';

import { OPTIONS, URLS } from '@/constants/coingecko-api';
import IAPISupportedToken from '@/interfaces/i-api-supported-token';
import IAPITokenData from '@/interfaces/i-api-token-data';
import { roundDecimal } from '@/lib/utils';

export default function useGetTokensData(
  supportedTokens: IAPISupportedToken[] | undefined,
  refetchInterval: number
) {
  const parallelQueries = useQueries({
    queries: (supportedTokens ?? []).map((token) => {
      return {
        queryKey: ['token-data', token.id, supportedTokens?.length],
        queryFn: async () => {
          const response = await fetch(URLS.tokensData(token.id), OPTIONS);

          if (!response.ok) {
            throw new Error(response.statusText);
          }

          const resultJSON = await response.json();

          if (
            resultJSON !== null &&
            resultJSON !== undefined &&
            typeof resultJSON === 'object' &&
            'id' in resultJSON &&
            typeof resultJSON.id === 'string' &&
            'symbol' in resultJSON &&
            typeof resultJSON.symbol === 'string' &&
            'name' in resultJSON &&
            typeof resultJSON.name === 'string' &&
            'image' in resultJSON &&
            resultJSON.image !== null &&
            resultJSON.image !== undefined &&
            typeof resultJSON.image === 'object' &&
            'large' in resultJSON.image &&
            typeof resultJSON.image.large === 'string' &&
            'market_data' in resultJSON &&
            resultJSON.market_data !== null &&
            resultJSON.market_data !== undefined &&
            typeof resultJSON.market_data === 'object' &&
            'current_price' in resultJSON.market_data &&
            resultJSON.market_data.current_price !== null &&
            resultJSON.market_data.current_price !== undefined &&
            typeof resultJSON.market_data.current_price === 'object' &&
            'eur' in resultJSON.market_data.current_price &&
            typeof resultJSON.market_data.current_price.eur === 'number'
          ) {
            return {
              id: resultJSON.id,
              symbol: resultJSON.symbol.toUpperCase(),
              name: resultJSON.name,
              logoURL: resultJSON.image.large,
              currentPrice: roundDecimal(resultJSON.market_data.current_price.eur, 2)
            } as unknown as IAPITokenData;
          }
        },
        refetchInterval
      };
    })
  });

  return {
    isLoading: parallelQueries.some((response) => response.isLoading),
    tokensData:
      parallelQueries.length > 0
        ? parallelQueries.map((response) => response.data).filter((data) => data !== undefined)
        : undefined
  };
}
