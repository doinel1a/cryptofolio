import { ECurrency } from './misc';

const CORS_WORK_AROUND = 'https://cors-anywhere.herokuapp.com/';

const URLS = {
  tokensSymbol: `${CORS_WORK_AROUND}https://pro-api.coinmarketcap.com/v1/cryptocurrency/map?listing_status=active&sort=id&aux=is_active`,
  tokensMetadata(tokensId: string[]) {
    const ids = tokensId.join(',');

    return `
      ${CORS_WORK_AROUND}https://pro-api.coinmarketcap.com/v2/cryptocurrency/info?symbol=${ids}&aux=logo&skip_invalid=true
    `;
  },
  tokensData(tokensId: string[], currencyCode: ECurrency) {
    const ids = tokensId.join(',');

    return `
      ${CORS_WORK_AROUND}https://pro-api.coinmarketcap.com/v2/cryptocurrency/quotes/latest?symbol=${ids}&convert=${currencyCode}&aux=is_active&skip_invalid=true
    `;
  }
};

const OPTIONS = {
  method: 'GET',
  headers(apiKey: string) {
    return {
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'application/json',
      'X-CMC_PRO_API_KEY': apiKey
    };
  }
};

export { URLS, OPTIONS };
