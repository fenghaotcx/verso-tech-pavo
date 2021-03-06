import styled from 'styled-components'
import { Fade } from '@mui/material'
import { useState} from 'react';
import arrowImg from '../../public/icon/arrow.svg'
import arrowImgDrak from '../../public/icon/arrowDark.svg'

const SelectDiv = styled.div`
    padding: 11px 18px 11px 14px;
    height: 43px;
    background: ${({theme})=> theme.colors.selectBg};
    border-radius: 14px;
    font-size: 14px;
    color: ${({theme})=> theme.colors.selectFont};
    cursor: pointer;
    display: flex;
    align-items: center;
    position: relative;
    & .arrow {
        width: 8px;
        margin-left: 8px;
    }
` 

const OptionCont  = styled.div`
    padding: 11px 14px;
    background: ${({theme})=> theme.colors.selectBg};
    border-radius: 14px;
    font-size: 14px;
    line-height: 21px;
    position: absolute;
    right: 0;
    top: 44px;
    z-index: 9;
`

const OptionItem = styled.div`
    margin-bottom: 4px; 
    white-space: nowrap;
`

const OptionDiv =  ({options,OptionDivClick,isCurrent}) => {
    // console.log('options====OptionDiv=====',options);
    options = options.filter(item => isCurrent !== item)
    return (
        <OptionCont>
            {options.map((item)=>{
                return <OptionItem key={item} onClick={()=>{OptionDivClick(item)}}>{item}</OptionItem>
            })}
        </OptionCont>
    )
}

const SelectBox = ({sort,options,theme}) => {
    // console.log('sort====',sort);
    // console.log('options====',options);

    const [isClick, setIsClick] = useState(false)
    const [isCurrent,setCurrent] = useState(options[0])
    

    const selectClick = () =>{
        if(sort !== 'select') return
        setIsClick(!isClick)
    }

    const OptionDivClick = (type) => {
        if(type ===  isCurrent) return
        // console.log('OptionDivClick=====',type);
        setCurrent(type)
    }
    return (
        <SelectDiv onClick={selectClick}>
            <div>{isCurrent}</div>
            {sort === 'select' && <img className="arrow" src={theme === 'dark'?arrowImgDrak:arrowImg} alt="" />}
            <Fade in={isClick} unmountOnExit><div><OptionDiv isCurrent={isCurrent} options={options} OptionDivClick={OptionDivClick}/></div></Fade>
        </SelectDiv>
    )
}




export default SelectBox