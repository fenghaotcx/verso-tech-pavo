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


// import styled from 'styled-components'

// const Sa = styled.div`
//   background: #FFFFFF;
//   width: calc((100% - 18px * 2) / 3);
//   height: 173px;
//   border-radius: 16px;
//   box-sizing: border-box;
//   padding: 17px 20px;
//   @media (max-width: 1025px) {
//     padding: 5px 7px;
//   }

// `
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
  const [addressType, setAddressType] = useState(WALLET_ADDRESS_TYPE);

  const { useConnectedWallet } = useWallet();
  const connectedWallet = useConnectedWallet();

  useEffect(() => {
    const localAddress = localStorage.getItem(ADDRESS_KEY);
    console.log('connectedWallet==========',connectedWallet);
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
  }, [address, setAddress,connectedWallet]);

  const { query, loading, error, refetch, refreshing } = useAssetsDataContext();
  console.log('query==',query);
  console.log('loading==',loading);
  console.log('error==',error);
  console.log('refetch==',refetch);
  console.log('refreshing==',refreshing);



  return (
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