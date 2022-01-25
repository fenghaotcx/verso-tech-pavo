import styled from 'styled-components';
import { useInitAddress, useInitNetwork, useLocationKey } from "../layouts/init"
import { usePollingPrices } from "../utils/app"

const ContainerDiv = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  color: ${({theme})=> theme.colors.font};
`

const Container = ({children}) => {
    usePollingPrices()
    useLocationKey()
    useInitAddress()
    useInitNetwork()

    return(
        <ContainerDiv>
            {children}
        </ContainerDiv>
    )
}

export default Container