import styled from 'styled-components';
import {useContext} from 'react';
import { GlobalContext } from '../../App';
import DehazeIcon from '@mui/icons-material/Dehaze';

const Tit = styled.div`
  font-family: Work Sans;
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

const Title = ({children}) => {
  const {toggleDrawer,isMobile} = useContext(GlobalContext)
  return (
    <Tit isMobile={isMobile}>
      {children}
      {isMobile?<DehazeIcon onClick={()=>{toggleDrawer(true)}} />:<></>}
    </Tit>
  )
}

export default Title