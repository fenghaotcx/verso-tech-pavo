import styled from 'styled-components'
import ArrowGreen from '../../img/icon/ArrowGreen.svg'
import ArrowRed from '../../img/icon/ArrowRed.svg'


const PercentageNumDiv = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: fit-content;
    min-width: 59.81px;
    height: 23px;
    border-radius: 14px;
    padding: 0 9px;
    font-size: 14px;
    background: ${({type}) => type === 'rise'?'#d1f5e8':'#ffe3e3;'};
    color: ${({type}) => type === 'rise'?'#20CC8E':'#FF7373;'};
    img {
        height: 8px;
        margin-left: 2.5px;
    }
`


const PercentageNum = ({num,type}) => {

    return (
        <PercentageNumDiv type = {type} >
            {num}% <img src={type === 'rise'?ArrowGreen:ArrowRed} alt="" />
        </PercentageNumDiv>
    )
}

export default PercentageNum