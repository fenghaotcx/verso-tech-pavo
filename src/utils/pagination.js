import { useEffect, useState } from "react"
import { useRecoilValueLoadable } from "recoil"
import { last } from "ramda"

export const iterateAllPage = async(
  query,
  nextOffset,
  limit,
  until
) => {
  const iterate = async (acc, offset) => {
    const data = await query(offset)
    const next = [...acc, ...data]
    const done = until?.(next) || data.length < limit

    return done ? next : await iterate(next, nextOffset(last(data)))
  }

  return await iterate([])
}

export const usePagination = (
  query,
  next,
  limit,
  key
) => {
  const [offset, setOffset] = useState()
  const [idle, setIdle] = useState(true)
  const [done, setDone] = useState(false)
  const [data, setData] = useState([])
  const { state, contents } = useRecoilValueLoadable(query(offset))

  useEffect(() => {
    if (state === "hasValue" && contents) {
      setIdle(false)
      setData((prev) => uniqByKey([...prev, ...contents], key))
      setDone(contents.length < limit)
    }
  }, [state, contents, limit, key])

  useEffect(() => {
    return () => {
      setOffset(undefined)
      setDone(false)
      setData([])
    }
  }, [])

  return {
    idle,
    isLoading: state === "loading",
    data,
    more: !done
      ? () => setOffset((offset) => next({ offset, data }))
      : undefined,
  }
}

/* utils */
export const uniqByKey = (list, key) =>
  list.reduce((acc, item) => {
    const exists = acc.some((prev) => prev[key] === item[key])
    return exists ? acc : [...acc, item]
  }, [])
