import styled from 'styled-components'
import LeftBox from './LeftBox'
import RightBox from './RightBox'


const Box = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  margin-bottom: 32px;
  @media (max-width: 1025px) {
    flex-wrap: wrap;
  }
` 


const Content = ({theme,isMobile}) => {
    return (
        <Box>
          <LeftBox isMobile={isMobile}/>
          <RightBox isMobile={isMobile} theme={theme}/>
        </Box>
    )
}

export default Content