import { gql } from "graphql-request"
import { WASMQUERY } from "../../constants"


const getDocument = ({ name, contract, msg }) =>
  !msg
    ? ``
    : `
    ${name}: ${WASMQUERY}(
      ContractAddress: "${contract}"
      QueryMsg: "${stringify(msg)}"
    ) {
      Height
      Result
    }`

const alias = (queries, name) => gql`
  query ${name} {
    ${queries.map(getDocument)}
  }
`

export default alias

export const stringify = (msg) =>
  JSON.stringify(msg).replace(/"/g, '\\"')
