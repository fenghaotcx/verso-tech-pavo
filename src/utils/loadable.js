import { useEffect } from "react"
import { useRecoilState, useRecoilValueLoadable } from "recoil"

export const useStore = (
  recoilValue,
  recoilState
) => {
  const [state, setState] = useRecoilState(recoilState)
  const query = useRecoilValueLoadable(recoilValue)

  useEffect(() => {
    query.state === "hasValue" && setState(query.contents)
  }, [query, setState])

  return { contents: state, isLoading: query.state === "loading" }
}

export const useStoreLoadable = (
  recoilValue,
  recoilState
) => {
  const [state, setState] = useRecoilState(recoilState)
  const query = useRecoilValueLoadable(recoilValue)

  useEffect(() => {
    query.state === "hasValue" && setState(query.contents)
  }, [query, setState])

  return state
}

export const getLoadableContents = (query) =>
  query.state === "hasValue" ? query.contents : undefined
