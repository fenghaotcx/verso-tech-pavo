import styled from 'styled-components' 
import Doubt from './Doubt'


const ProgressDiv = styled.div`
    width: 100%;
    height: 31px;
    border-radius: 30px;
    background: ${({type})=> type === 'Increase'?'rgba(255, 115, 115, 0.1);':'rgba(55, 225, 164, 0.1)'};
    @media (max-width: 1025px) {
      padding: 5px 7px;
    }
`

const ProgressFloat = styled.div`
    display: flex;
    align-items: center;
    justify-content: end;
    width: ${({num})=> num/0.6  + '%' };
    height: 100%;
    border-radius: 30px;
    background: ${({type})=> type === 'Increase'?'#FF7373;':'#20CC8E'}; ;
    font-size: 16px;
    color: #FFFFFF;
    padding: 0 25px;
`

const ProgressBar = ({type='Increase',num=42}) => {
    return (
        <ProgressDiv type={type}>
            <ProgressFloat type={type} num={num}>
               {num>=20 ?<Doubt />: <></>} {num}%
            </ProgressFloat>
        </ProgressDiv>
    )
}

export default ProgressBar