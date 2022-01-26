import {useState,useMemo} from 'react';
import { styled,css } from '@mui/system';
import Button from '@mui/material/Button';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import { AccAddress } from '@terra-money/terra.js';
import styles from 'styled-components';
import { ADDRESS_KEY } from '../constants';
import { useNavigate } from 'react-router-dom';
import useWallet from '../lib/useWallet';
import ConnectModal from './ConnectModal';
import walletImg from '../public/icon/wallet.svg';
import walletDarkImg from '../public/icon/wallet_dark.svg';

import btn_down from '../public/icon/btn_down.svg';
import {truncate} from '../utils/convertFloat';

const ConnectBtn = styles.div`
  position: relative; 
`
const DialogDiv = styles.div`
  margin: 20px 40px;
  width: ${({isMobile})=> isMobile?'':'400px'};
  display: flex;
  &>input {
    width: 80%;
    // border-radius: 9px;
    // border: none;
    outline: none;
    margin-right: 20px;
    padding: 0;
  }
`
const MyButton = styled(Button)`
  border-radius: 10px;
  background: ${({ismobile})=>ismobile==='true'? '#FFF':'#304FFD'};
  height: ${({ismobile})=>ismobile==='true'? '32px':'46px'};
  font-family: 'Poppins';
  font-weight: 500;
  font-size: ${({ismobile})=>ismobile==='true'? '12px':'15px'};
  color: ${({ismobile})=>ismobile==='true'? ' #3F434A':'#fff'};
  text-transform: Capitalize;
  padding: 0 ${({ismobile})=>ismobile==='true'? '14px':'20px'};
  // margin-left: ${({index})=> index===0 ?'40px':'24px'};
  display: flex;
  align-items: center;
  & .walletImg {
    margin-right: ${({ismobile})=>ismobile==='true'? '8px':'12px'};
  }
  & .down {
    margin-left: 12px;
  }
  ${({ismobile})=>ismobile==='true'? 'box-shadow: none;':''}
  ${({ismobile}) =>
      css({
        '&:hover': {
          backgroundColor:  ismobile==='true'? '#fff':'#304FFD',
        },
      })
  }
`


function SimpleDialog(props) {
  // const { onClose, selectedValue, open,address,handleAddress,getWarningText,validWalletAddress,navigate,isMobile} = props;
  const { onClose, selectedValue, open,address,handleAddress,getWarningText,validWalletAddress,isMobile} = props;

  const handleClose = () => {
    onClose(selectedValue);
  };
  const onAddressSubmit = () => {
    localStorage.setItem(ADDRESS_KEY, address);
    // navigate('/autoFarm',{replace: true});
  };

  return (
    <Dialog onClose={handleClose} open={open}>
      <DialogTitle sx={{textAlign: 'center' }}>Connect Wallet</DialogTitle>
      <DialogDiv isMobile={isMobile}>
        <input defaultValue={address} onChange={handleAddress} placeholder="Enter a Terra address" />
        <Button disabled={!validWalletAddress} onClick={onAddressSubmit} variant="contained">Submit</Button>
      </DialogDiv>
      <div>{getWarningText()}</div>
    </Dialog>
  );
}


export default function LoginDialog({isMobile}) {
  const [open, setOpen] = useState(false);
  const [address, setAddress] = useState('')
  const [showModal, setModalVisible] = useState(false);

  const validWalletAddress = useMemo(() => AccAddress.validate(address), [address]);
  let navigate = useNavigate();
  const { onConnect, useConnectedWallet, disconnect } = useWallet();
  const connectedWallet = useConnectedWallet();

  const getWarningText = () => {
    if (address) {
      if (validWalletAddress) {
        return 'Valid Terra Address';
      } else return '* Terra Address is Invalid';
    }
  };

  const handleAddress = (e) => {
    e.preventDefault();
    setAddress(e.target.value);
  };

  const handleClose = (value) => setOpen(false);

  const onTypeSelect = (type) => {
    onConnect(type);
    setModalVisible(false);
  };

  return (
    <>
      <MyButton ismobile={isMobile.toString()} onClick={()=> setOpen(true)}>Test Connect</MyButton>
      <ConnectBtn>
        <MyButton  
          ismobile={isMobile.toString()}
          onClick={isMobile ? () => onTypeSelect('Mobile') : () => setModalVisible(!showModal)} variant="contained"
        >
          <img className='walletImg' src={isMobile?walletDarkImg:walletImg} alt='' />
          {connectedWallet?.terraAddress?
            <div>
              <span>{truncate(connectedWallet?.terraAddress)}</span>
              <img className='down' src={btn_down} alt='' />
            </div>
            :
            isMobile?'Connect':'Connect Wallet'
          }
        </MyButton>
        <SimpleDialog
          open={open}
          onClose={handleClose}
          address={address}
          getWarningText={getWarningText}
          handleAddress={handleAddress}
          validWalletAddress={validWalletAddress}
          navigate={navigate}
          isMobile={isMobile}
          setModalVisible={setModalVisible}
          showModal={showModal}
        />
        <ConnectModal 
          disconnect={disconnect} 
          isConnect={connectedWallet?.terraAddress} 
          address={connectedWallet?.terraAddress} 
          showModal={showModal} 
          setModalVisible={setModalVisible}
        />
      </ConnectBtn>
    </>
  );
}