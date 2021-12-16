import styled from 'styled-components'
import logoImg from '..//public/icon/Logo.svg'

const LogoDiv = styled.div`
  font-family: 'Poppins-Bold';
  font-weight: bold;
  font-size: 24px;
  line-height: 36px;
  display: flex;
  align-items: center;
  color: #3F434A;
  margin-bottom: ${({isMobile}) => isMobile?'38px':'68px'};
  ${({isMobile}) => isMobile?'padding: 20px 0 0 20px;':''}
  & img {
    width: 26px;
    margin-right: 5px;
  }
`

const Logo = ({isMobile}) => <LogoDiv isMobile={isMobile}><img src = {logoImg} alt = "logo" />PAVO</LogoDiv>;


export default Logo