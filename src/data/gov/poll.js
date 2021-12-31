import { selectorFamily, useRecoilValue } from "recoil"
import { protocolQuery } from "../contract/protocol"
import { getContractQueryQuery } from "../../utils/query"
import { useParsePoll } from "./parse"


export const PollStatus  = {
  InProgress: "in_progress",
  Passed: "passed",
  Rejected: "rejected",
  Executed: "executed",
}


export const govPollQuery = selectorFamily({
  key: "govPoll",
  get:
    (id) =>
    async ({ get }) => {
      const { contracts } = get(protocolQuery)
      const getContractQuery = get(getContractQueryQuery)
      return await getContractQuery(
        {
          contract: contracts["gov"],
          msg: { poll: { poll_id: id } },
        },
        "govPoll"
      )
    },
})

export const usePoll = (id) => {
  const poll = useRecoilValue(govPollQuery(id))
  const parsePoll = useParsePoll()
  return poll && parsePoll(poll)
}
