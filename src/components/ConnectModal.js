import styles from 'styled-components';
import { styled,css } from '@mui/system';
import useWallet from '../lib/useWallet';
import useMobileDown from '../hooks/useMobileDown';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import terra_m from '../public/icon/Terra-m.svg';
import terra_s from '../public/icon/Terra-s.svg';
import { useNavigate } from 'react-router-dom';

const MobTit = styles.div`
  font-family: Poppins;
  font-weight: 500;
  font-size: 20px;
  line-height: 30px;
  color: #3F434A;
  text-align: center;
  margin-bottom: 10px;
`
const ConnectDivBot = styles.div`
  position: absolute;
  width: 100%;
  height: 125px;
  left: 0;
  top: 56px;
  background: #FFFFFF;
  box-shadow: 0px 8px 24px rgba(44, 63, 88, 0.1);
  border-radius: 12px;
  padding: 20px;
  &>.item {
    font-family: Poppins;
    font-weight: normal;
    font-size: 14px;
    line-height: 22px;
    cursor: pointer;
    &:hover {
      color: #304FFD;
    }
  }
  &>.line {
    width: 100%;
    height: 1px;
    background: #D8D8D8;
    opacity: 0.5;
    margin: 20px 0; 
  }
`

const MyButton = styled(Button)`
  background: #FFFFFF;
  border: 1px solid #EBEBEB;
  box-sizing: border-box;
  border-radius: 8px;
  color: #153055;
  height: 70px;
  width: 100%;
  font-size: 16px;
  text-transform: Capitalize;
  margin-top: 20px;
  display: flex;
  align-items: center;
  padding: 0 20px;
  justify-content: space-between;
  & img {
    width: 30px;
  }
  ${() =>
      css({
        '&:hover': {
          border: '1px solid #304FFD',
          backgroundColor: '#FFFFFF',
        },
      })
  }
`

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 500,
  height: 320,
  bgcolor: '#FFF',  
  boxShadow: '0px 3px 14px rgba(112, 144, 176, 0.08)', 
  borderRadius: '20px',
  padding: '50px 20px',
};

const content = 'Terra Station Extension'

const ConnectModal = ({ showModal, setModalVisible, isConnect, address, disconnect }) => {
  const isMobile = useMobileDown()
  const { onConnect } = useWallet();
  const navigate = useNavigate();
  const onTypeSelect = (type) => {
    onConnect(type);
    setModalVisible(false);
  };
  const onCopyClick = () => {
    navigator.clipboard.writeText(address)
  };

  const onDisconnect = () => {
    // if (addressType === WALLET_ADDRESS_TYPE) {
    //   disconnect();
    // }
    disconnect()
    navigate('/')
  };

  if (isMobile) {
    return <> </>;
  }
  if(isConnect) {
    return (
      showModal &&
      <ConnectDivBot >
        <div onClick={onCopyClick} className='item'>Copy address</div>
        <div className='line'></div>
        <div onClick={onDisconnect} className='item'>Disconnect</div>
      </ConnectDivBot>
    )
  }
  return (
    <Modal
      open={showModal}
      onClose={() => setModalVisible(false)}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <MobTit>Connect to a wallet</MobTit>
        <MyButton onClick={() => onTypeSelect()}>
          <span>{content}</span>
          <img src={terra_s} alt=''/>
        </MyButton>
        <MyButton onClick={() => onTypeSelect('Mobile')}>
          <span>{content}</span>
          <img src={terra_m} alt=''/>
        </MyButton>
      </Box>
    </Modal>
  )
}

export default ConnectModal