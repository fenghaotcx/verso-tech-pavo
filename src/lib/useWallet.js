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
          install(ConnectType.CHROME_EXTENSION);
        }
        if (availableConnectTypes.includes(ConnectType.CHROME_EXTENSION)) {
          connect(ConnectType.CHROME_EXTENSION);
        } else if (availableConnectTypes.includes(ConnectType.WEBEXTENSION)) {
          connect(ConnectType.WEBEXTENSION);
        }
        else if (availableInstallTypes.includes(ConnectType.EXTENSION)){
          // connect(availableConnectTypes[0])
          install(ConnectType.EXTENSION)
        }else{
          connect(ConnectType.EXTENSION)
        }
      }
    };
    return { onConnect, useConnectedWallet, disconnect, post };
  }

  return { onConnect: null, connectedWallet: null, disconnect: null, post: null };
};

export default useWalletConnect;