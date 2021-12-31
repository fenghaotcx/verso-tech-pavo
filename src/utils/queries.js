import { selector, selectorFamily } from "recoil"
import { request } from "graphql-request"
import alias from "../data/contract/alias"
import { protocolQuery } from "../data/contract/protocol"
import { locationKeyState } from "./app"
import { mantleURLQuery } from "../network"
import { parseResults } from "./parse"

export const LUNA = {
  token: "uluna",
  symbol: "Luna",
  name: "Luna",
  pair: "",
  lpToken: "",
  status: "LISTED",
}

/* queries */
export const getTokensContractQueriesQuery = selectorFamily({
  key: "getTokensContractQueries",
  get:
    (tokens) =>
    ({ get }) => {
      const getContractQueries = get(getContractQueriesQuery)

      return async (
        fn,
        name
      ) => {
        const document = alias(
          tokens.map((token) => ({ name: token, ...fn(token) })),
          name
        )

        return await getContractQueries(document, name)
      }
    },
})

export const getListedContractQueriesQuery = selector({
  key: "getListedContractQueries",
  get: ({ get }) => {
    const { listedAll } = get(protocolQuery)
    const getContractQueries = get(getContractQueriesQuery)

    return async (fn, name) => {
      const document = alias(
        listedAll
          .filter((item) => fn(item))
          .map((item) => ({ name: item.token, ...fn(item) })),
        name
      )

      return await getContractQueries(document, name)
    }
  },
})

export const getContractQueriesQuery = selector({
  key: "getContractQueries",
  get: ({ get }) => {
    get(locationKeyState)
    const url = get(mantleURLQuery)

    return async (document, name) => {
      try {
        const result = await request(
          url + "?" + name,
          document
        )

        return result ? parseResults(result) : undefined
      } catch (error) {
        const result = (error).response.data
        return result ? parseResults(result) : undefined
      }
    }
  },
})
