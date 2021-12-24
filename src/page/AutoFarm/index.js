// import { useEffect, useState } from 'react';
// import { ADDRESS_KEY, LOCAL_ADDRESS_TYPE, WALLET_ADDRESS_TYPE } from '../../constants';
// import useWallet from '../../lib/useWallet';
// import { useAssetsDataContext } from '../../contexts';


const Page2 = () => {

  // const [address, setAddress] = useState('');
  // const [addressType, setAddressType] = useState(WALLET_ADDRESS_TYPE);

  // const { useConnectedWallet } = useWallet();
  // const connectedWallet = useConnectedWallet();


  // useEffect(() => {
  //   const localAddress = localStorage.getItem(ADDRESS_KEY);
  //   const walletAddress = connectedWallet?.terraAddress;
  //   if (walletAddress) {
  //     setAddress(walletAddress);
  //     setAddressType(WALLET_ADDRESS_TYPE);
  //   } else {
  //     if (localAddress) {
  //       setAddress(localAddress);
  //       setAddressType(LOCAL_ADDRESS_TYPE);
  //     }
  //   }
  //   console.log('localAddress====',localAddress);
  //   console.log('walletAddress====',walletAddress);
  // }, [address, setAddress]);

  // const { assets, loading, error, refetch, refreshing } = useAssetsDataContext();
  // console.log('assets==',assets);
  // console.log('loading==',loading);
  // console.log('error==',error);
  // console.log('refetch==',refetch);
  // console.log('refreshing==',refreshing);
    return (
        <>
          <div>page2</div>
        </>
    )
}

export default Page2