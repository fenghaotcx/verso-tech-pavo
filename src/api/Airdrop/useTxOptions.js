import { plus } from '../../utils/math';
import { StdFee } from '@terra-money/terra.js';
import useFee from '../../utils/useFee';

export const useTxOptions = (msgs, memo = undefined) => {
  const { gas, gasPrice, amount } = useFee(msgs.length);
  const gasPrices = `${gasPrice}uusd`;
  const tax = '0';
  const fee = new StdFee(gas, { uusd: plus(amount, tax) });
  const txOptions = {
    msgs,
    memo: memo,
    gasPrices,
    fee,
    purgeQueue: true,
  };
  return txOptions;
};
