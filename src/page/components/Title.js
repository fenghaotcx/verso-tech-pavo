import styled from 'styled-components';
import {useContext} from 'react';
import { GlobalContext } from '../../App';
import DehazeIcon from '@mui/icons-material/Dehaze';
import Logo from '../../components/Logo'

const Tit = styled.div`
  font-family: 'Poppins-Bold';
  font-style: normal;
  font-weight: bold;
  font-size: ${({isMobile}) => isMobile?'22px':'40px'};
  line-height: 47px;
  color: #153055;
  margin-bottom: ${({isMobile}) => isMobile?'33px':'53px'};
  display: flex;
  align-items: center;
  justify-content: space-between;
`

const MobTit = styled.div`
  margin: 40px 0 37px 0;
  font-family: 'Poppins-Bold';
  font-size: 20px;
  line-height: 30px;
`

const Title = ({children}) => {
  const {toggleDrawer,isMobile} = useContext(GlobalContext)
  return (
    <>
      <Tit isMobile={isMobile}> 
        {isMobile?<Logo isMobile={isMobile}/>:children}
        {isMobile?<DehazeIcon onClick={()=>{toggleDrawer(true)}} />:<></>}
      </Tit>
      {isMobile?<MobTit>{children}</MobTit>:<></>}
    </>
  )
}

export default Title