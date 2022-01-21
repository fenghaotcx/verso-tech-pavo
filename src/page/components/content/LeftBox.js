import styles from 'styled-components';
import LogoWhite from '../../../public/icon/LogoWhite.svg';
import DollarImg from '../../../public/icon/Dollar.svg';
// import MyButton from '../MyButton';
import LoadingButton from '@mui/lab/LoadingButton';
import { styled,css } from '@mui/system';
import { useState, useEffect } from 'react';
import useWallet from '../../../lib/useWallet';
import {claimAirdrops} from '../../../api/Airdrop/claim';


const LeftDiv = styles.div`
  flex:1;
  height: 302px;
  background:${({theme})=> theme.colors.totalLeftBg};
  border-radius: 14px;
  position: relative;
  font-size: 15px;
  line-height: 22px;
  color: #F4F9FD;
  padding: 44px 10px 25px 28px;
  display: flex;
  justify-content: space-around;
  ${({isMobile})=> isMobile?'margin-bottom: 30px;':''}
  & .white_logo {
    position: absolute;
    left: 0;
    bottom: 0;
    z-index: 0;
  }
  & div {
    position: relative;
    z-index: 1;
  }
  & .right_info {
    & div {
        font-weight: 700;
        font-size: 30px;
        line-height: 45px;
    }
    & .total {
        margin: 4px 0  34px  0;
    }
  }
` 
const Dollar = styles.div`
    width: 65px;
    height: 66px;
    background: #FFFFFF;
    border-radius: 14px;
    display: flex;
    align-items: center;
    justify-content: center;
    
    & img {
        height: 53px;
    }
` 

const MyButton = styled(LoadingButton)`
  height: 45px;
  font-weight: 700;
  font-family: 'Poppins';
  font-size: 15px;
  background-color: ${({backgc}) => backgc !== 'bule'?'#fff':'#304FFD'};
  border-radius: 14px;
  color: ${({backgc}) => backgc !== 'bule'?'#304FFD':'#fff'};
  textTransform: 'Capitalize';
  padding: 0 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  ${({backgc}) =>
      css({
        '&:hover': {
          backgroundColor: `${ backgc !== 'bule'?'#fff':'#304FFD'}`,
        },
      })
  }
`

const LeftBox = ({isMobile,airdrops,setOpen}) => {
    const [airdropSum, setAirdropSum] = useState('0');
    const [loading, setLoading] = useState(false);
    const { useConnectedWallet, post } = useWallet();
    const connectedWallet = useConnectedWallet();

    useEffect(() => {
        setAirdropSum(airdrops?.total || '0');
    }, [airdrops]);

    const onClaimAirdrop = async () => {
        if (airdrops?.data?.length > 0 && connectedWallet?.terraAddress) {
          setLoading(true)
        // if (airdrops.data.length > 0 ) {
          const result = await claimAirdrops(airdrops.data, connectedWallet.terraAddress, post);
          if (result) {
            setAirdropSum('0');
          } else {
            setOpen(true)
            setTimeout(()=>{
                setOpen(false)
            },2000)
          }
        }
        setLoading(false)
    };
    return (
        <LeftDiv isMobile={isMobile}>
            <img className="white_logo" src={LogoWhite} alt="" />
            <Dollar>
                <img src={DollarImg} alt="" />
            </Dollar>
            <div className="right_info">
                <p>Total Farming APR </p>
                <div>0%</div>
                <p>Pending Rewards & Airdrops</p>
                <div className="total">{airdropSum}</div>
                <MyButton 
                  onClick={onClaimAirdrop} 
                  loading={loading}
                  variant="outlined"
                >{loading?' ':'Claim All'}</MyButton>
            </div>
        </LeftDiv>
    )
}

export default LeftBox