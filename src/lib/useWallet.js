/* eslint-disable react-hooks/rules-of-hooks */
// import { WalletConnectType } from '../constants';
import { ConnectType, useWallet, useConnectedWallet }  from '@terra-money/wallet-provider';

const useWalletConnect = () => {
  if (typeof window !== undefined) {
    // const { ConnectType, useWallet, useConnectedWallet } = require('@terra-money/wallet-provider');
    const { availableConnectTypes, availableInstallTypes, connect, install, disconnect, post } = useWallet();
    const onConnect = (type) => {
      if (type === 'Mobile') {
        connect(ConnectType.WALLETCONNECT);
      } else {
        if (availableInstallTypes.includes(ConnectType.CHROME_EXTENSION)) {
          console.log(1111111111);
          install(ConnectType.CHROME_EXTENSION);
        }
        if (availableConnectTypes.includes(ConnectType.CHROME_EXTENSION)) {
          console.log(2222222222);
          connect(ConnectType.CHROME_EXTENSION);
        } else if (availableConnectTypes.includes(ConnectType.WEBEXTENSION)) {
          console.log(3333333333);
          connect(ConnectType.WEBEXTENSION);
        }
        else if (availableInstallTypes.includes(ConnectType.EXTENSION)){
          console.log(444444444);
          // connect(availableConnectTypes[0])
          install(ConnectType.EXTENSION)
        }else{
          console.log(55555555);
          connect(ConnectType.EXTENSION)
        }
      }
    };
    return { onConnect, useConnectedWallet, disconnect, post };
  }

  return { onConnect: null, connectedWallet: null, disconnect: null, post: null };
};

export default useWalletConnect;