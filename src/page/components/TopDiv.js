import styled from 'styled-components'


const Top = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  margin-bottom: ${({isMobile})=> isMobile?'0':'32px'};
  @media (max-width: 1025px) {
    flex-wrap: wrap;
  }
`

const TopDiv = ({children,isMobile}) => <Top isMobile={isMobile}>{children}</Top>

export default TopDiv