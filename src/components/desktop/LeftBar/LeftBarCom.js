import styled from 'styled-components';
import Drawer from '@mui/material/Drawer';

const anchor = 'left'

const Left = styled.div`
  width: 20%;
  height: 100vh;
  padding: 35px 0 0 40.5px;
  box-sizing: border-box;
  position: fixed;
  left: 0;
  top: 0;
  overflow: hidden;
  background: ${({theme}) => theme.colors.bubblePositive};
`

const LeftBarCom = ({children,isMobile,toggleDrawer,open}) => {
  return (
    isMobile?
    <Drawer anchor={anchor} open={open} onClose={toggleDrawer}>
        {children}
    </Drawer>:
    <Left>{children}</Left>
  )
};
  
  
export default LeftBarCom