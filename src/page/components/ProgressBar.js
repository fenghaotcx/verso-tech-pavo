import styled from 'styled-components' 
import Doubt from './Doubt'


const ProgressDiv = styled.div`
    width: ${({isMobile})=>isMobile?'100%':'70%'};
    height: 31px;
    border-radius: 30px;
    background: ${({type})=> type === 'Increase'?'rgba(255, 115, 115, 0.1);':'rgba(55, 225, 164, 0.1)'};
`

const ProgressFloat = styled.div`
    display: flex;
    align-items: center;
    justify-content: ${({isMobile})=>isMobile?'start':'end'};
    width: ${({num})=> num/0.6  + '%' };
    height: 100%;
    border-radius: 30px;
    background: ${({type})=> type === 'Increase'?'#FF7373;':'#20CC8E'}; ;
    font-size: 16px;
    color: #FFFFFF;
    padding: 0 25px;
`

const ProgressBar = ({type='Increase',num=42,isMobile}) => {
    return (
        <ProgressDiv isMobile={isMobile} type={type}>
            <ProgressFloat isMobile={isMobile} type={type} num={num}>
               {!isMobile && +num>=25?<Doubt />:<></>} {num}%
            </ProgressFloat>
        </ProgressDiv>
    )
}

export default ProgressBar