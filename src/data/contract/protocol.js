import { selector, useRecoilValue } from "recoil"
import axios from "axios"
import { ICON_URL } from "../../constants"
import { getIsTokenNative, lookupSymbol } from "../../lib/parse"
import { BalanceKey, PriceKey } from "../../hooks/contractKeys"
import { whitelistExternalQuery } from "../external/external"
import { networkQuery } from "../../network"

const protocolAddressQuery = selector({
  key: "protocolAddress",
  get: async ({ get }) => {
    const { contract: url } = get(networkQuery)

    try {
      const { data } = await axios.get(url)
      return data
    } catch {
      throw new Error(`Failed to load contract: ${url}`)
    }
  },
})

const protocolHelpersQuery = selector({
  key: "protocolHelpers",
  get: ({ get }) => {
    const { whitelist } = get(protocolAddressQuery)
    const whitelistExternal = get(whitelistExternalQuery)

    const listedAll = Object.values(whitelist)
    const listedAllExternal = Object.values(whitelistExternal)
    const listed = listedAll.filter(({ status }) => status !== "DELISTED")

    const getToken = (symbol) =>
      !symbol
        ? ""
        : getIsTokenNative(symbol)
        ? symbol
        : [...listed, ...listedAllExternal].find(
            (item) => item.symbol === symbol
          )?.["token"] || ""

    const getSymbol = (token) =>
      !token
        ? ""
        : getIsTokenNative(token)
        ? token
        : { ...whitelist, ...whitelistExternal }[token]?.symbol || ""

    const getIcon = (token) => {
      const symbol = getSymbol(token)
      const ticker = getIsTokenNative(symbol)
        ? lookupSymbol(symbol)
        : symbol.startsWith("m")
        ? symbol.slice(1)
        : symbol

      const icon = ticker && `${ICON_URL}/${ticker}.png`
      const externalIconURL = whitelistExternal[token]?.icon
      return externalIconURL || icon
    }

    const getPriceKey = (key, token) =>
      getIsExternal(token)
        ? key
        : getIsTokenNative(token)
        ? PriceKey.NATIVE
        : getIsDelisted(token)
        ? PriceKey.END
        : key === PriceKey.ORACLE
        ? getIsPreIPO(key)
          ? PriceKey.PRE
          : key
        : key

    const getBalanceKey = (token) =>
      getIsExternal(token)
        ? BalanceKey.EXTERNAL
        : getIsTokenNative(token)
        ? BalanceKey.NATIVE
        : BalanceKey.TOKEN

    const getIsDelisted = (token) =>
      whitelist[token]?.status === "DELISTED" ||
      whitelistExternal[token]?.status === "DELISTED"

    const getIsPreIPO = (token) =>
      whitelist[token]?.status === "PRE_IPO"

    const getIsExternal = (token) => !!whitelistExternal[token]

    const toAssetInfo = (token) =>
      getIsTokenNative(token)
        ? { native_token: { denom: token } }
        : { token: { contract_addr: token } }

    const toToken = ({ amount, token }) => ({
      amount,
      info: toAssetInfo(token),
    })

    const parseAssetInfo = (info) => {
      const token =
        "native_token" in info
          ? info.native_token.denom
          : info.token.contract_addr

      return { token, symbol: getSymbol(token) }
    }

    const parseToken = ({ amount, info }) => ({
      amount,
      ...parseAssetInfo(info),
    })

    return {
      listed,
      listedAll,
      listedAllExternal,

      getToken,
      getSymbol,
      getIcon,

      getPriceKey,
      getBalanceKey,

      getIsDelisted,
      getIsPreIPO,
      getIsExternal,

      toAssetInfo,
      parseAssetInfo,

      toToken,
      parseToken,
    }
  },
})

export const protocolQuery = selector({
  key: "protocol",
  get: ({ get }) => ({
    ...get(protocolAddressQuery),
    ...get(protocolHelpersQuery),
  }),
})

export const useProtocol = () => {
  return useRecoilValue(protocolQuery)
}
