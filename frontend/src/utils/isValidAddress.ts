import { isAddress } from "web3-validator";

export const isValidAddress = (address: string) => {
  return isAddress(address);
};
