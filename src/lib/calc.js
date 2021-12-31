import BigNumber from "bignumber.js"
import { gt } from "../utils/math"

const calc = {
  minimumReceived: (params) => {
    const { offer_amount, belief_price, max_spread, commission } = params
    const expectedAmount = new BigNumber(offer_amount).div(belief_price)
    const rate1 = new BigNumber(1).minus(max_spread)
    const rate2 = new BigNumber(1).minus(commission)
    return expectedAmount.times(rate1).times(rate2).toString()
  },

  mint: (params) => {
    const { collateral, asset, ratio } = params

    if (collateral.price && asset.price) {
      const exchange = new BigNumber(collateral.price).div(asset.price)

      if (collateral.amount) {
        const exchanged = new BigNumber(collateral.amount).times(exchange)

        if (ratio) {
          const $asset = { amount: exchanged.div(ratio).toString() }
          return { ...params, asset: { ...asset, ...$asset } }
        } else if (asset.amount) {
          const $ratio = exchanged.div(asset.amount).toString()
          return { ...params, ratio: $ratio }
        }
      } else if (asset.amount && ratio) {
        const exchanged = new BigNumber(asset.amount).div(exchange)
        const $collateral = { amount: exchanged.times(ratio).toString() }
        return { ...params, collateral: { ...collateral, ...$collateral } }
      }
    }

    return params
  },


  toLP: (deposits, totalShare) =>
    gt(totalShare, 0)
      ? BigNumber.minimum(
          ...deposits.map(({ amount, pair }) =>
            new BigNumber(amount).times(totalShare).div(pair)
          )
        ).toString()
      : new BigNumber(deposits[0].amount)
          .times(deposits[1].amount)
          .sqrt()
          .toString(),

  fromLP: (lp, shares , totalShare ) =>
    Object.entries(shares).reduce(
      (acc, [key, { amount, token }]) => ({
        ...acc,
        [key]: {
          amount: new BigNumber(lp).times(amount).div(totalShare).toString(),
          token,
        },
      }),
      {}
    ),
}

export default  calc
