import Title from '../components/Title';
import TopDiv from '../components/TopDiv';
import StatisticsBox from '../components/StatisticsBox';
import Content from '../components/content';
import TableBox from '../components/TableBox';
import CollateralTable from '../components/CollateralTable';
import FarmingTable from '../components/FarmingTable';
import BalancesTable from '../components/BalancesTable';
import BorrowingTable from '../components/BorrowingTable';
import CollateralMoblie from '../components/CollateralTable/moblie/CollateralMoblie'
import {useContext, useEffect, useState} from 'react';
import { GlobalContext } from '../../App';
import { ADDRESS_KEY, LOCAL_ADDRESS_TYPE, WALLET_ADDRESS_TYPE } from '../../constants';
import useWallet from '../../lib/useWallet';
import { useAssetsDataContext } from '../../contexts';
import CircularProgress from '@mui/material/CircularProgress';
import styled from 'styled-components';
import { convertToFloatValue } from '../../utils/convertFloat';
import { LCDClient,MnemonicKey,Coin, } from '@terra-money/terra.js';
import { useUusdBalance } from "../native/balance"


const LoadDiv = styled.div`
  width: 100%;
  height:  calc(100vh - 178px);
  display: flex;
  align-items: center;
  justify-content: center;
}
`

const arr = [
  {
    name: 'Total Net Worth',
    totol: 30,
    percentage: 40,
    Increase: 5.8,
    profit: 12000,
    index:0
  },
  {
    name: 'Total Assets',
    totol: 30,
    percentage: 40,
    Increase: 5.8,
    profit:12000,
    index:1
  },
  {
    name: 'Total Debts',
    totol: 30,
    percentage: 40,
    Increase: 5.8,
    profit: 12000,
    index:2
  }
]

const Dashboard = () => {
  const { isMobile,windowWidth,theme } = useContext(GlobalContext)
  const [address, setAddress] = useState('');
  const [, setAddressType] = useState(WALLET_ADDRESS_TYPE);
  const { useConnectedWallet } = useWallet();
  const connectedWallet = useConnectedWallet();
  
  useEffect(() => {
    const localAddress = localStorage.getItem(ADDRESS_KEY);
    const walletAddress = connectedWallet?.terraAddress;
    if (walletAddress) {
      setAddress(walletAddress);
      setAddressType(WALLET_ADDRESS_TYPE);
    } else {
      if (localAddress) {
        setAddress(localAddress);
        setAddressType(LOCAL_ADDRESS_TYPE);
      }
    }    
    console.log('localAddress====',localAddress);
    console.log('walletAddress====',walletAddress);
    
  }, [address, setAddress,connectedWallet,]);


  const terra = new LCDClient({
      URL: 'https://lcd.terra.dev',
      chainID: 'columbus-5'
  });

  const mk = new MnemonicKey();
  const wallet = terra.wallet(mk);
  const  main = async() => {
    const marketParams = await terra.market.parameters();
    const exchangeRates = await terra.oracle.exchangeRates();
    const bank = await terra.bank.total()
    console.log('marketParams========',marketParams);
    console.log('exchangeRates========',exchangeRates);
    console.log('bank========',bank);
    console.log('wallet========',wallet);
  }
  main()
  const offerCoin = new Coin('uusd', '1000000');
  terra.market.swapRate(offerCoin, 'ukrw').then(c => {
    console.log(`1111111111111======================${offerCoin.toString()} can be swapped for ${c.toString()}`);
  });
  // const { assets, loading, error, refetch, refreshing } = useAssetsDataContext();
  const { assets, loading } = useAssetsDataContext();


  const allData= [
    assets?.assets,
    assets?.pylon,
    assets?.anchorEarn,
    assets?.anchorBond,
    assets?.anchorBorrow,
    assets?.rewards,
    assets?.pools,
    assets?.mirrorBorrow,
    assets?.mirrorShortFarm,
    assets?.specFarm,
    assets?.specReward,
    assets?.starterraFarms,
    assets?.loterra,
    assets?.lunaStaking,
    assets?.airdrops,
    assets?.apollo,
    assets?.nexus,
  ]
  let totalBorrowing = 0;
  let totalAssets = 0;
  let totalRewards = 0;
  allData.forEach((data) => {
    totalBorrowing += data?.totalBorrow ? data.totalBorrow : 0;
    totalAssets += data?.totalValue ? data.totalValue : 0;
    totalAssets += data?.totalGov ? data.totalGov : 0;
    totalRewards += data?.totalReward ? data.totalReward : 0;
  });

  const getTotalMarketValue = () => {
    const total = totalAssets + totalRewards - totalBorrowing;

    return total;
  };

  const totalMarketValue = getTotalMarketValue().toFixed(3);
  arr[0].totol = convertToFloatValue(totalMarketValue.toString())
  arr[1].totol = convertToFloatValue(totalAssets.toString())
  arr[2].totol = convertToFloatValue(totalBorrowing.toString())


  const uusd = useUusdBalance()

  console.log('uusd==============uusd==============uusd================uusd===========uusd',uusd);

  return (
      loading?
      <LoadDiv>
        <CircularProgress color="primary" />
      </LoadDiv>:
      <>
        <Title>{isMobile?'Dashboard':'My Portfolio'}</Title>
        <TopDiv isMobile={isMobile}>
          {arr.map((item,index)=>{
            return <StatisticsBox isMobile={isMobile} theme={theme} info={item}  key={index}/>
          })}
        </TopDiv>
        <Content theme={theme} isMobile={isMobile}/>
        <TableBox isNoTable={true} name={'Collateral'}>
          {isMobile ? <CollateralMoblie isMobile={isMobile}/>:<CollateralTable theme={theme}/>}
        </TableBox>
        <TableBox marginType={true} name={'Wallet Balances'}>
          <BalancesTable  theme={theme} windowWidth={windowWidth} isMobile={isMobile}/>
        </TableBox>
        <TableBox name={'Borrowing'}>
          <BorrowingTable  theme={theme} windowWidth={windowWidth} isMobile={isMobile}/>
        </TableBox>
        <TableBox name={'Farming'}>
          <FarmingTable  theme={theme} windowWidth={windowWidth} isMobile={isMobile}/>
        </TableBox>
      </>
  )
}

export default Dashboard