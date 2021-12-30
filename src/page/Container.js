import styled from 'styled-components';
import { useInitAddress, useInitNetwork, useLocationKey } from "../layouts/init"

const ContainerDiv = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  color: ${({theme})=> theme.colors.font};
`

const Container = ({children}) => {

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