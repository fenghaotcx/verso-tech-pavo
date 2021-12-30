import { useEffect } from "react"
import { useLocation } from "react-router-dom"
import { useSetRecoilState } from "recoil"
import { useWallet } from "@terra-money/wallet-provider"
import useAddress from "../hooks/useAddress"
import { addressState } from "../wallet"
import { locationKeyState } from "../utils/app"
import { networkNameState } from "../network"

export const useLocationKey = () => {
  const { pathname, hash, search } = useLocation()
  const setLocationKey = useSetRecoilState(locationKeyState)

  useEffect(() => {
    setLocationKey((k) => k + 1)
  }, [pathname, hash, search, setLocationKey])
}

export const useInitAddress = () => {
  const address = useAddress()
  const setAddress = useSetRecoilState(addressState)

  useEffect(() => {
    setAddress(address || "")
  }, [address, setAddress])
}

export const useInitNetwork = () => {
  const wallet = useWallet()
  const { name } = wallet.network

  const setNetworkName = useSetRecoilState(networkNameState)
  useEffect(() => {
    setNetworkName(name)
  }, [name, setNetworkName])
}

export const useAlertByNetwork = () => {
  const { network } = useWallet()

  return (
    process.env.NODE_ENV !== "development" &&
    window.location.hostname === "terra-dev.mirror.finance" &&
    network.name !== "testnet"
  )
}
