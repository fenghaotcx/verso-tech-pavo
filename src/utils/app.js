import { useEffect, useState } from "react"
import { atom, useSetRecoilState } from "recoil"
import { isNil } from "ramda"
import { PRICES_POLLING_INTERVAL } from "../constants"

export const locationKeyState = atom({
  key: "locationKey",
  default: 0,
})

export const priceKeyIndexState = atom({
  key: "priceKeyIndex",
  default: 0,
})

export const usePollingPrices = () => {
  const [intervalId, setIntervalId] = useState()
  const setPriceKeyIndex = useSetRecoilState(priceKeyIndexState)

  useEffect(() => {
    const id = setInterval(
      () => setPriceKeyIndex((n) => n + 1),
      PRICES_POLLING_INTERVAL
    )

    setIntervalId(id)
  }, [setPriceKeyIndex])

  useEffect(() => {
    return () => {
      !isNil(intervalId) && clearInterval(intervalId)
    }
  }, [intervalId])
}
