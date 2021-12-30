import { selector } from "recoil"
import { request } from "graphql-request"
import { WASMQUERY } from "../constants"
import { locationKeyState } from "../utils/app"
import { mantleURLQuery } from "../network"
import { parseResult } from "./parse"
import { WASM } from "../page/native/gqldocs"

/* native */
export const getNativeQueryQuery = selector({
  key: "getNativeQuery",
  get: ({ get }) => {
    get(locationKeyState)
    const url = get(mantleURLQuery)

    return async(
      params,
      name
    ) => {
      const { document, variables } = params
      return await request(url + "?" + name, document, variables)
    }
  },
})

/* query */
export const getContractQueryQuery = selector({
  key: "getContractQuery",
  get: ({ get }) => {
    get(locationKeyState)
    const url = get(mantleURLQuery)

    return async(variables, name) => {
      const document = getDocument(variables)

      const result = await request(
        url + "?" + name,
        WASM,
        document
      )

      return parseResult(result[WASMQUERY])
    }
  },
})

/* helpers */
export const getDocument = ({ contract, msg }) => {
  return { contract, msg: JSON.stringify(msg) }
}
