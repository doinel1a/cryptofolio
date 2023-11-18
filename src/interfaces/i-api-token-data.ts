/* eslint-disable semi */
/* eslint-disable unicorn/prevent-abbreviations */

import IAPISupportedToken from './i-api-supported-token';

export default interface IAPITokenData extends IAPISupportedToken {
  logoURL: string;
  currentPrice: number;
}
