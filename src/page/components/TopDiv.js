import styled from 'styled-components'


const Top = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 100%;
  margin-bottom: 32px;
`


const TopDiv = ({children}) => <Top>{children}</Top>

export default TopDiv