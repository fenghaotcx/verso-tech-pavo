import styled from 'styled-components'
import logoImg from '../img/icon/Logo.svg'

const LogoDiv = styled.div`
  font-weight: bold;
  font-size: 24px;
  line-height: 36px;
  display: flex;
  align-items: center;
  color: #3F434A;
  margin-bottom: 68px;
  & img {
    width: 26px;
    margin-right: 5px;
  }
`

const Logo = () => <LogoDiv><img src = {logoImg} alt = "logo" /> PAVO</LogoDiv>;


export default Logo