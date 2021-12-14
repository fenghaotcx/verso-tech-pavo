import styled from 'styled-components'
import LeftBox from './LeftBox'
import RightBox from './RightBox'


const Box = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 100%;
  margin-bottom: 32px;
` 



const Content = () => {
    return (
        <Box>
          <LeftBox />
          <RightBox />
        </Box>
    )
}

export default Content