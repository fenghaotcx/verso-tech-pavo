import { selector } from "recoil"
import { protocolQuery } from "./protocol"
import { getContractQueryQuery } from "../../utils/query"


export const pairSimulateQuery = selector({
  key: "pairSimulate",
  get: ({ get }) => {
    const { toToken } = get(protocolQuery)
    const getContractQuery = get(getContractQueryQuery)

    return async (params) => {
      const { pair, token, amount, reverse } = params
      return await getContractQuery(
        {
          contract: pair,
          msg: !reverse
            ? { simulation: { offer_asset: toToken({ token, amount }) } }
            : { reverse_simulation: { ask_asset: toToken({ token, amount }) } },
        },
        "pairSimulate"
      )
    }
  },
})
