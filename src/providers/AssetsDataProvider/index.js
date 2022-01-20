import {createContext, useState,useMemo, useEffect,useContext } from 'react';
import { useLazyQuery, NetworkStatus } from '@apollo/client';
import { getAssets } from '../../graphql/queries/getAssets';
import { ADDRESS_KEY } from '../../constants';
import useWallet from '../../lib/useWallet';
import { assignData } from './assignData';


const AssetContext = createContext({
  assets: null,
  data: null,
  error: false,
  refetch: null,
  loading: false,
  refreshing: false,
  updateAccountData: null,
});

const AssetsDataProvider = ({ children }) => {
  const [address, setAddress] = useState('');
  const [accountData, setAccountData] = useState(null);
  const { useConnectedWallet } = useWallet();
  const connectedWallet = useConnectedWallet();
  const localAddress = localStorage.getItem(ADDRESS_KEY);

  const [fetchAssets, { data, loading: assetsLoading, error, refetch: refetchQuery, networkStatus }] = useLazyQuery(
    getAssets,
    {
      variables: { address: address },
      notifyOnNetworkStatusChange: true,
    },
  );

  // 线上
  useEffect(() => {
    const walletAddress = connectedWallet?.terraAddress;
    if (walletAddress) {
      setAddress(walletAddress);
    } else if (localAddress) {
      setAddress(localAddress);
    }
  }, [localAddress, connectedWallet]);
  // 线上
  useEffect(() => {
    if (address && address !== '') {
      fetchAssets({ variables: { address: address } });
    }
  }, [address,fetchAssets]);


  // // 线下测试
  // useEffect(() => {
  //   // const walletAddress = connectedWallet?.terraAddress;
  //   if (localAddress) {
  //     setAddress(localAddress);
  //   } else if (localAddress) {
  //     setAddress(localAddress);
  //   }
  // }, [localAddress, connectedWallet]);
  // // 线下测试
  // useEffect(() => {
  //   if (localAddress && localAddress !== '') {
  //     fetchAssets({ variables: { address: localAddress } });
  //   }
  // }, [localAddress,fetchAssets]);

  const refreshing = networkStatus === NetworkStatus.refetch && assetsLoading;
  const loading = !refreshing && assetsLoading;
  const refetch = () => refetchQuery({ address: address });

  useEffect(() => {
    setAccountData(data);
    console.log('============data====================================data============',data);
  }, [data]);

  const assets = useMemo(() => {
    if (accountData) {
      const assetsData = assignData(accountData);
      return assetsData;
    }
    return null;
  }, [accountData]);

  const updateAccountData = (newAccountData) => {
    setAccountData(newAccountData);
  };

  return (
    <AssetContext.Provider
      value={{ assets, data: accountData, loading, error, refetch, refreshing, updateAccountData }}
    >
      {children}
    </AssetContext.Provider>
  );
};

export default AssetsDataProvider;

export function useAssetsDataContext() {
  const context = useContext(AssetContext);
  if (context === undefined) {
    throw new Error('useAssetsDataContext must be used within AssetProvider');
  }
  return context;
}
