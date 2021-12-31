import { last } from "ramda"
import { atomFamily, selectorFamily } from "recoil"
import { getContractQueriesQuery } from "../../utils/queries"
import { getContractQueryQuery } from "../../utils/query"
import { useStore } from "../../utils/loadable"
import { usePagination } from "../../utils/pagination"
import alias from "../contract/alias"
import { protocolQuery } from "../contract/protocol"
import { locationKeyState } from "../../utils/app"

export const LIMIT = 30


const govPollsQuery = selectorFamily({
  key: "govPolls",
  get:
    (offset) =>
    async ({ get }) => {
      get(locationKeyState)
      const { contracts } = get(protocolQuery)
      const getContractQuery = get(getContractQueryQuery)
      const response = await getContractQuery(
        {
          contract: contracts["gov"],
          msg: { polls: { limit: LIMIT, start_after: offset } },
        },
        "govPolls"
      )

      return response?.polls || []
    },
})

export const pollsByIdsQuery = selectorFamily({
  key: "pollsByIds",
  get:
    (ids) =>
    async ({ get }) => {
      const getContractQueries = get(getContractQueriesQuery)
      const { contracts } = get(protocolQuery)

      if (ids.length) {
        const document = alias(
          ids.map((id) => ({
            name: "poll" + id,
            contract: contracts["gov"],
            msg: { poll: { poll_id: id } },
          })),
          "pollsByIds"
        )

        return (await getContractQueries(document, "pollsByIds")) || {}
      }

      return {}
    },
})

const pollsByIdsState = atomFamily({
  key: "pollsByIdsState",
  default: {},
})

/* hooks */
export const usePolls = () => {
  return usePagination(govPollsQuery, ({ data }) => last(data)?.id, LIMIT, "id")
}

export const usePollsByIds = (ids) => {
  return useStore(pollsByIdsQuery(ids), pollsByIdsState(ids))
}
