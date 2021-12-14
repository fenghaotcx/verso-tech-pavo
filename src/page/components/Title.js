import styled from 'styled-components'


const Tit = styled.div`
  font-family: Work Sans;
  font-style: normal;
  font-weight: bold;
  font-size: 40px;
  line-height: 47px;
  color: #153055;
  margin-bottom: 53px;
`


const Title = ({children}) => <Tit>{children}</Tit>

export default Title