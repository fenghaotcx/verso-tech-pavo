// import { useConnectedWallet } from "@terra-money/wallet-provider";
// import { useState, useEffect } from 'react';
import { ADDRESS_KEY } from '../constants';

// const useAddress = () => {
//   const connectedWallet = useConnectedWallet()
//   console.log('connectedWallet=======connectedWallet',connectedWallet);
//   const [address, setAddress] = useState('');
//   useEffect(() => {
//     const localAddress = localStorage.getItem(ADDRESS_KEY);
//     setAddress(localAddress)
//   }, [address]);
//   // return connectedWallet?.terraAddress || address || ''
//   return address || connectedWallet?.terraAddress
// }

// export default useAddress


import { useConnectedWallet } from "@terra-money/wallet-provider"

const useAddress = () => {
  // console.log('====================================');
  // console.log(localStorage.getItem(ADDRESS_KEY));
  // console.log('====================================');
  const connectedWallet = useConnectedWallet()
  // return connectedWallet?.terraAddress || ""
  return localStorage.getItem(ADDRESS_KEY) || connectedWallet?.terraAddress 
}

export default useAddress
