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
import Snackbar from '@mui/material/Snackbar';
// import  {useMyTotal}  from '../../data/my/total';


const LoadDiv = styled.div`
  width: 100%;
  height:  calc(100vh - ${({isMobile})=>isMobile?'180px':'278px'});
  display: flex;
  align-items: center;
  justify-content: center;
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
  const [open, setOpen] = useState(false);
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
    // console.log('localAddress====',localAddress);
    // console.log('walletAddress====',walletAddress);
    
  }, [address, setAddress,connectedWallet,]);
  // const { assets, loading, error, refetch, refreshing } = useAssetsDataContext();
  let { assets, loading, refetch } = useAssetsDataContext();
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
  console.log('assets==============assets==============assets================assets===========assets',assets);
  console.log('Borrow============================',assets?.anchorBorrow);
  return (
      <>
        <Title refetch={refetch}>{isMobile?'Dashboard':'My Portfolio'}</Title>
        {loading?
        <LoadDiv isMobile={isMobile}>
          <CircularProgress color="primary" />
        </LoadDiv>:
        <>
          <TopDiv isMobile={isMobile}>
            {arr.map((item,index)=>{
              return <StatisticsBox isMobile={isMobile} theme={theme} info={item}  key={index}/>
            })}
          </TopDiv>
          <Content setOpen={setOpen}  assets={assets?.assets} theme={theme} airdrops={assets?.airdrops} isMobile={isMobile}/>
          <TableBox total= {assets?.anchorBorrow?.totalValueString}  isNoTable={true} name={'Collateral'}>
            {isMobile ? <CollateralMoblie borrow={assets?.anchorBorrow || {}}  isMobile={isMobile}/>
              :<CollateralTable borrow={assets?.anchorBorrow || {}}  theme={theme}/>}
          </TableBox>
          <TableBox total={assets?.assets?.total} marginType={true} name={'Wallet Balances'}>
            <BalancesTable 
              assets={assets?.assets}  
              theme={theme} 
              windowWidth={windowWidth} 
              isMobile={isMobile}
            />
          </TableBox>
          <TableBox total= {assets?.anchorBorrow?.total} name={'Borrowing'}>
            <BorrowingTable 
              borrow={assets?.anchorBorrow || {}}  
              mirrorBorrow={assets?.mirrorBorrow || {}} 
              theme={theme} 
              windowWidth={windowWidth} 
              isMobile={isMobile}
            />
          </TableBox>
          <TableBox total={`${assets?.starterraFarms?.totalValue?'$':''}${convertToFloatValue(assets?.starterraFarms?.totalValue||0)}`} name={'Farming'}>
            <FarmingTable 
              // mirrorShortFarm={assets?.mirrorShortFarm}
              starterraFarms={assets?.starterraFarms} 
              specFarm={assets?.specFarm} 
              specReward={assets?.specReward} 
              theme={theme} 
              windowWidth={windowWidth} 
              isMobile={isMobile}
            />
          </TableBox>
          <Snackbar 
            anchorOrigin={{ vertical:'top', horizontal:'center' }}
            open={open}
            message="Error Claiming Airdrops"
          />
        </>
        }
      </>
  )
}

export default Dashboard