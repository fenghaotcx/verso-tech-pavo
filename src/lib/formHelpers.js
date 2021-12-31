import { AccAddress } from "@terra-money/terra.js"
import { div, gt, gte, isInteger, pow } from "../utils/math"
import { getLength, omitEmpty } from "./utils"
import { dp as getDp, validateDp, lookup, format, toAmount } from "./parse"

/* forms */
export const placeholder = (symbol) => step(symbol).replace("1", "0")
export const step = (symbol) => div(1, pow(10, getDp(symbol)))

export const renderBalance = (
  balance,
  symbol,
  affix
) =>
  balance && symbol
    ? {
        title: [affix, "Balance"].filter(Boolean).join(" "),
        content: format(balance, symbol),
      }
    : undefined


export const validate = {
  required: (value) => (!value ? "Required" : ""),

  length: (value, { min, max }, label) =>
    min && getLength(value) < min
      ? `${label} must be longer than ${min} bytes.`
      : max && getLength(value) > max
      ? `${label} must be shorter than ${max} bytes.`
      : "",

  address: (value, isAddress = [AccAddress.validate]) =>
    !value
      ? "Required"
      : !isAddress.some((validate) => validate(value))
      ? "Invalid address"
      : "",

  url: (value) => {
    try {
      const { hostname } = new URL(value)
      return hostname.includes(".") ? "" : "Invalid URL"
    } catch (error) {
      const protocol = ["https://", "http://"]
      return !protocol.some((p) => value.startsWith(p))
        ? `URL must start with ${protocol.join(" or ")}`
        : "Invalid URL"
    }
  },

  integer: (value, label) =>
    !isInteger(value) ? `${label} must be an integer` : "",

  amount: (value, range, label = "Amount") => {
    const { optional, symbol, min, max, dp } = range
    const amount = symbol ? toAmount(value) : value

    return optional && !value
      ? ""
      : !value
      ? "Required"
      : !min && !gt(value, 0)
      ? `${label} must be greater than 0`
      : min && !gte(amount, min)
      ? `${label} must be greater than ${lookup(min, symbol)}`
      : !validateDp(value, symbol, dp)
      ? `${label} must be within ${dp || getDp(symbol)} decimal points`
      : max && gt(max, 0) && gt(amount, max)
      ? `${label} must be between 0 and ${lookup(max, symbol)}`
      : symbol && max && !gt(max, 0)
      ? "Insufficient balance"
      : ""
  },

  symbol: (symbol) => {
    const regex = RegExp(/[a-zA-Z+-]/)
    return Array.from(symbol).some((char) => !regex.test(char)) ? "Invalid" : ""
  },
}

/* data (utf-8) */
export const toBase64 = (object) => {
  try {
    return Buffer.from(JSON.stringify(omitEmpty(object))).toString("base64")
  } catch (error) {
    return ""
  }
}

export const fromBase64 = (string) => {
  try {
    return JSON.parse(Buffer.from(string, "base64").toString())
  } catch (error) {
    return {} 
  }
}
