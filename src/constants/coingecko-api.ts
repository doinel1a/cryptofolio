const URLS = {
  supportedTokens: 'https://api.coingecko.com/api/v3/coins/list?include_platform=false',
  tokensData(tokenID: string) {
    return `https://api.coingecko.com/api/v3/coins/${tokenID}?localization=false&tickers=false&market_data=true&community_data=false&developer_data=false&sparkline=false`;
  }
};

const OPTIONS = {
  method: 'GET',
  headers: {
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'application/json'
  }
};

export { URLS, OPTIONS };
