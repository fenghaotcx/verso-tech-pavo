import BN from 'bignumber.js';
import { isNil } from "ramda"

export const sum = (array) =>
  array.length ? BN.sum.apply(null, array.filter(isFinite)).toString() : '0';
export const plus = (a, b) => new BN(a || 0).plus(b || 0).toString();
export const div = (a, b) => new BN(a || 0).div(b || 1).toString();
export const gt = (a, b) => new BN(a).gt(b);
export const times = (a, b) => new BN(a || 0).times(b || 0).toString();
export const floor = (n) => new BN(n).integerValue(BN.ROUND_FLOOR).toString();
export const ceil = (n) => new BN(n).integerValue(BN.ROUND_CEIL).toString();
export const minus = (a, b) => new BN(a || 0).minus(b || 0).toString();
export const decimal = (number = '0', decimals = 6) =>
  new BN(number).decimalPlaces(decimals, BN.ROUND_DOWN).toFormat(decimals);
export const toAmount = (amount, decimals = 6) => {
  const number = new BN(amount || 0).div(new BN(10).pow(decimals));
  return decimal(number.toString(), decimals);
};
export const pow = (a, b) =>
  new BN(a).pow(b).toString()

export const min = (array=[]) =>
  BN.min.apply(null, array.filter(isFinite)).toString()

export const max = (array=[]) =>
  BN.max.apply(null, array.filter(isFinite)).toString()

export const abs = (n) => new BN(n).abs().toString()

/* format */
export const number = (n) => new BN(n).toNumber()

export const lt = (a, b)=> new BN(a).lt(b)
export const gte = (a, b)=> new BN(a).gte(b)
export const lte = (a, b)=> new BN(a).lte(b)

export const isFinite = (n)=>
  !isNil(n) && new BN(n).isFinite()

export const isInteger = (n)=>
  !isNil(n) && new BN(n).isInteger()
