import { selector,atom } from "recoil"
import { request } from "graphql-request"
// import { RequestDocument, Variables } from "graphql-request/dist/types"
// import { WASMQUERY } from "../../constants"
// import { locationKeyState } from "../app"
// import { mantleURLQuery } from "../network"
// import { parseResult } from "./parse"
// import { WASM } from "../native/gqldocs"
import networks, { defaultNetwork } from "./networks"
import { gql } from "graphql-request"

const parseResult = (params) =>
  params ? (JSON.parse(params.Result)) : undefined

const parseResults = (object) =>
  Object.entries(object).reduce((acc, [token, data]) => {
    const next = data && parseResult(data)
    return Object.assign({}, acc, next && { [token]: next })
  }, {})

const WASM = gql`
  query WasmContractsContractAddressStore($contract: String, $msg: String) {
    WasmContractsContractAddressStore(
      ContractAddress: $contract
      QueryMsg: $msg
    ) {
      Height
      Result
    }
  }
`

const WASMQUERY = 'WasmContractsContractAddressStore'
const locationKeyState = atom({
  key: "locationKey",
  default: 0,
})

export const networkNameState = atom({
  key: "networkName",
  default: defaultNetwork.name,
})

const networkQuery = selector({
  key: "network",
  get: ({ get }) => {
    const name = get(networkNameState)
    return networks[name]
  },
})

const mantleURLQuery = selector({
  key: "mantleURL",
  get: ({ get }) => {
    const { mantle } = get(networkQuery)
    return mantle
  },
})


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
