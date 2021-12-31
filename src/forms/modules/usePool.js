import { times, floor, gt, plus } from "../../utils/math"
import { format, formatAsset } from "../../lib/parse"
import calc from "../../lib/calc"
import { useProtocol } from "../../data/contract/protocol"
import { PriceKey } from "../../hooks/contractKeys"
import { usePairPool } from "../../data/contract/contract"
import { parsePairPool, useFindPrice } from "../../data/contract/normalize"

const usePool = () => {
  const priceKey = PriceKey.PAIR
  const { getSymbol } = useProtocol()
  const pairs = usePairPool()
  const findPrice = useFindPrice()

  return ({ amount, token }) => {
    const pair = findPrice(priceKey, token)
    const oracle = findPrice(PriceKey.ORACLE, token)
    const price = gt(pair, 0) ? pair : oracle

    /* pair pool */
    const pairPool = parsePairPool(pairs?.[token])

    /* estimate uusd */
    const estimated = gt(amount, 0) ? floor(times(amount, price)) : "0"

    /* to lp */
    const deposits = [
      { amount, pair: pairPool.asset },
      { amount: estimated, pair: pairPool.uusd },
    ]

    const toLP = calc.toLP(deposits, pairPool.total)

    /* from lp */
    const shares = {
      asset: { amount: pairPool.asset, token },
      uusd: { amount: pairPool.uusd, token: "uusd" },
    }

    const fromLP = calc.fromLP(amount, shares, pairPool.total)
    const assetValueFromLP = times(
      findPrice(priceKey, token),
      fromLP.asset.amount
    )
    const valueFromLP = plus(assetValueFromLP, fromLP.uusd.amount)

    return {
      toLP: {
        estimated,
        value: toLP,
        text: gt(estimated, 0) ? format(estimated, "uusd") : "0",
      },

      fromLP: {
        ...fromLP,
        value: valueFromLP,
        text: fromLP
          ? [fromLP.asset, fromLP.uusd]
              .map(({ amount, token }) => formatAsset(amount, getSymbol(token)))
              .join(" + ")
          : "0",
      },
    }
  }
}

export default usePool
