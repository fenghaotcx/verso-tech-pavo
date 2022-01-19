import {useState,useMemo} from 'react';
import Button from '@mui/material/Button';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import { AccAddress } from '@terra-money/terra.js';
import styled from 'styled-components';
import { ADDRESS_KEY } from '../constants';
import { useNavigate } from 'react-router-dom';
import useWallet from '../lib/useWallet';
import ConnectModal from './ConnectModal';


const DialogDiv = styled.div`
  margin: 20px 40px;
  width: 400px;
  &>input {
    width: 80%;
    // border-radius: 9px;
    // border: none;
    outline: none;
    margin: 0 auto;
    padding: 0;
  }
`


function SimpleDialog(props) {
  const { onClose, selectedValue, open,address,handleAddress,
    getWarningText,validWalletAddress,navigate} = props;

  const handleClose = () => {
    onClose(selectedValue);
  };
  const onAddressSubmit = () => {
    localStorage.setItem(ADDRESS_KEY, address);
    navigate('/autoFarm',{replace: true});
  };

  return (
    <Dialog onClose={handleClose} open={open}>
      <DialogTitle sx={{textAlign: 'center' }}>Connect Wallet</DialogTitle>
      <DialogDiv>
        <input defaultValue={address} onChange={handleAddress} placeholder="Enter a Terra address" />
        <div>{getWarningText()}</div>
        <Button disabled={!validWalletAddress} onClick={onAddressSubmit} variant="contained">Submit</Button>
        
      </DialogDiv>
    </Dialog>
  );
}


export default function LoginDialog({isMobile}) {
  const [open, setOpen] = useState(false);
  const [address, setAddress] = useState('')
  const [showModal, setModalVisible] = useState(false);

  const validWalletAddress = useMemo(() => AccAddress.validate(address), [address]);
  let navigate = useNavigate();
  const { onConnect, useConnectedWallet } = useWallet();
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

  const handleClose = (value) => {
    setOpen(false);
  };

  const onTypeSelect = (type) => {
    onConnect(type);
    setModalVisible(false);
  };

  return (
    <div>
      <Button  
         onClick={isMobile ? () => onTypeSelect('Mobile') : () => setModalVisible(!showModal)} variant="contained">
            {connectedWallet?.terraAddress?'Connected':'Connect Wallet'}
        </Button>
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
      <ConnectModal showModal={showModal} setModalVisible={setModalVisible} />
    </div>
  );
}