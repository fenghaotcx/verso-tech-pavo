import styled from 'styled-components'
import logoImg from '../public/icon/Logo.svg'
import logoImgDark from '../public/icon/LogoDark.svg'

const LogoDiv = styled.div`
  font-family: 'Poppins-Bold';
  font-weight: bold;
  font-size: 24px;
  line-height: 36px;
  display: flex;
  align-items: center;
  color: ${({theme})=> theme.colors.font};
  margin-bottom: ${({isMobile}) => isMobile?'0':'68px'};
  & img {
    width: 26px;
    margin-right: 5px;
  }
`

const Logo = ({isMobile,theme}) => <LogoDiv isMobile={isMobile}><img src = {theme === 'dark'?logoImgDark:logoImg} alt = "logo" />PAVO</LogoDiv>


export default Logo