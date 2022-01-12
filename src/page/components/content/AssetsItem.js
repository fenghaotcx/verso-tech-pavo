import styled from 'styled-components';
import assetLogo from '../../../public/icon/assetLogo.svg';
import useMobileDown from '../../../hooks/useMobileDown';
import {numberFormat} from '../../../utils/convertFloat';

const ItemDiv = styled.div`
    background: ${({theme})=> theme.colors.itemDivBg};
    box-shadow: 0px 3px 14px rgba(112, 144, 176, 0.08);
    border-radius: 8px;
    display: flex;
    padding: 10px 20px;
    letter-spacing: -0.02em;
    justify-content: space-between;
    @media (max-width: 1025px) {
        padding: 9px 13px 11px;
    }
    & .ImgDiv {
        width: 40px;
        margin-right: 14px;
    }
    & img {
        width: 40px;
        // margin-right: 14px;
    }
`
const ItemLfet = styled.div`
    @media (max-width: 1025px) {
        width: 100%;
    }
`

const ItemTop = styled.div`
    display: flex;
    align-items: center;
    font-size: 14px;
    line-height: 20px;
    color: #7B84A3;
    margin-bottom: 1px;
    @media (max-width: 1025px) {
        font-size: 12px;
        line-height: 18px;
    }
    &>span {
        width: 10px;
        height: 7.5px;
        dispaly; block;
        background: #304FFD;
        border-radius: 4px;
        margin-left: 4px;
    }
`

const ItemBot = styled.div`
    display: flex;
    align-items: center;
    font-weight: 700;
    font-size: 24px;
    line-height: 32px;
    color: ${({theme})=> theme.colors.selectFont};
    @media (max-width: 1025px) {
        font-size: 24px;
        line-height: 32px;
        flex-wrap: wrap;
    }
    &>span {
        font-family: DM Sans;
        font-style: normal;
        font-weight: bold;
        font-size: 12px;
        display: flex;
        height: 24px;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        padding: 3px 8px;
        background: rgba(5, 205, 153, 0.1);
        border-radius: 58px;
        color: #05CD99;
        margin-left: 8px;
    }
`

const AssetsItem = ({data,index}) => {
    const isMobile = useMobileDown()
    const color = ['#5b79d6','#ff7171','#ffdd6a','#90cc7b']
    return (
        <ItemDiv>
            {data[0].name !== 'Others' && !isMobile  ?<img src={assetLogo} alt="" />:!isMobile && <div className='ImgDiv'></div>}
            <ItemLfet>
                <ItemTop>
                    <div>{data[0].name || data[0].url}</div>
                    <span style={{background:color[index]}}></span>
                </ItemTop>
                <ItemBot>
                    <div>{numberFormat(data[4].value)}</div>
                    <span>{data[5].percentage}%</span>
                </ItemBot>
            </ItemLfet>
        </ItemDiv>
    )
}

export default AssetsItem