/* eslint-disable semi */
/* eslint-disable unicorn/prevent-abbreviations */

export default interface IStake {
  id: string;
  tokenName: string;
  providerName: string;
  quantity: number;
  apr: number;
  apy: number;
}
