import { useConnectedWallet } from "@terra-money/wallet-provider";
import { useState, useEffect } from 'react';
import { ADDRESS_KEY } from '../constants';

const useAddress = () => {
  const connectedWallet = useConnectedWallet()
  const [address, setAddress] = useState('');
  useEffect(() => {
    const localAddress = localStorage.getItem(ADDRESS_KEY);
    setAddress(localAddress)
  }, [address]);
  // return connectedWallet?.terraAddress || address || ''
  return address || connectedWallet
}

export default useAddress
