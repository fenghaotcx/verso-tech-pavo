import { selectorFamily, useRecoilValue } from "recoil"
import { protocolQuery } from "./protocol"
import { getContractQueryQuery } from "../../utils/query"

export const limitOrderQuery = selectorFamily({
  key: "limitOrder",
  get:
    (id) =>
    async ({ get }) => {
      const { contracts } = get(protocolQuery)
      const getContractQuery = get(getContractQueryQuery)
      return await getContractQuery(
        {
          contract: contracts["limitOrder"],
          msg: { order: { order_id: id } },
        },
        "limitOrder"
      )
    },
})

export const useLimitOrder = (id) => {
  return useRecoilValue(limitOrderQuery(id))
}
