import styled from 'styled-components';
import Drawer from '@mui/material/Drawer';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles({
  drawer: {
    '& .MuiPaper-root': {
      background:  ({theme}) => theme === 'dark'?'linear-gradient(162.58deg, #3A395B 21.71%, #29293F 73.67%)':'#fff',
    }
  }
})

const anchor = 'left'

const Left = styled.div`
  width: ${({short})=> short?'19%':'fit-content'};
  height: 100%;
  padding: ${({short})=> short?'35px 0 0 2.5%':'35px 10px 0 10px'};
  box-sizing: border-box;
  background: ${({theme}) => theme.colors.Leftbackground};
  // border-radius: 20px;
  position: relative;
`

const LeftBarCom = ({children,isMobile,toggleDrawer,isopen,cls,theme,setShow,short}) => {
  const classes = useStyles({theme})
  console.log('open====LeftBarCom=====',isopen);
  return (
    isMobile?
    <Drawer 
      className={`${classes.drawer} ${cls}`} 
      anchor={anchor} 
      open={isopen} 
      onClose={()=>{toggleDrawer(false)}}>
      {children}
    </Drawer>:
    <Left short={short} className={cls} onMouseEnter={()=> setShow(true)} onMouseLeave={()=> setShow(false)}>
      {children}
    </Left>
  )
};
  
  
export default LeftBarCom