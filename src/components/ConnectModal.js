// import styled from 'styled-components';
import useWallet from '../lib/useWallet';
import useMobileDown from '../hooks/useMobileDown';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';

// const Tit = styled.div`
//   font-family: 'Poppins-Bold';
//   font-style: normal;
//   font-weight: bold;
//   font-size: ${({isMobile}) => isMobile?'22px':'40px'};
//   line-height: 47px;
//   color: ${({theme})=> theme.colors.font};
//   margin-bottom: ${({isMobile}) => isMobile?'33px':'53px'};
//   display: flex;
//   align-items: center;
//   justify-content: space-between;
// `

// const MobTit = styled.div`
//   margin: 40px 0 37px 0;
//   font-family: 'Poppins-Bold';
//   font-size: 20px;
//   line-height: 30px;
// `


const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

const ConnectModal = ({ showModal, setModalVisible }) => {
  const isMobile = useMobileDown()
  const { onConnect } = useWallet();

  const onTypeSelect = (type) => {
    onConnect(type);
    setModalVisible(false);
  };

  if (isMobile) {
    return <> </>;
  }
  return (
    <Modal
      open={showModal}
      onClose={() => setModalVisible(false)}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >   
        <Box sx={style}>
            <Button variant="contained" onClick={() => onTypeSelect()}>Terra Wallet (Extension)</Button>
            <Button variant="contained" onClick={() => onTypeSelect('Mobile')}>Terra Wallet (Mobile)</Button>
        </Box>
        
    </Modal>
  )
}

export default ConnectModal