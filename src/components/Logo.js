import styled from 'styled-components';
import logoImg from '../public/icon/Logo.svg';
import logoImgM from '../public/icon/LogoM.svg';
import logoImgDark from '../public/icon/LogoDark.svg';
import logoImgDarkM from '../public/icon/LogoDarkM.svg';

const LogoDiv = styled.a`
  font-family: 'Poppins-Bold';
  font-weight: bold;
  font-size: 24px;
  line-height: 36px;
  display: flex;
  align-items: center;
  color: ${({theme})=> theme.colors.font};
  margin-bottom: ${({isMobile}) => isMobile?'0':'68px'};
  &>.logo {
    width: ${({isMobile})=> isMobile?'97px':'110px'};
  }
`

const Logo = ({isMobile,theme}) => 
  <LogoDiv href='/' rel="noreferrer" isMobile={isMobile}>
    {!isMobile?
      <img className='logo' src={theme === 'dark'?logoImgDark:logoImg} alt = "logo" />:
      <img className='logoM' src={theme === 'dark'?logoImgDarkM:logoImgM} alt = "logo" />
    }
  </LogoDiv>


export default Logo