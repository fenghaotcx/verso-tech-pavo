import IconButton from '@mui/material/IconButton';
import { styled } from '@mui/system';
import doubtImg from '../../public/icon/doubt.svg'
import doubtGrayImg from '../../public/icon/doubtGray.svg'
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';
import style from 'styled-components';


const MyIconButton = styled(IconButton)`
    background: none;
    width: 15px;
    height: 15px;
    border: ${({my_type})=>my_type === 1? '1.5px solid #A3AED0': '1.5px solid #FFFFFF'};
    display: flex;
    align-items: center;
    margin-right: 5px;
`

const HtmlTooltip = styled(({ className, ...props }) => (
    <Tooltip {...props} placement="left-start" classes={{ popper: className }} />
  ))(() => ({
    [`& .${tooltipClasses.tooltip}`]: {
        backgroundColor: 'rgba(0,0,0,0)',
    },
}));

const TooltipTop = style.div`   
    width: 100%;
    height: 49px;
    display: flex;
    align-items: center;
    font-size: 15px;
    padding-left: 18px;
    background: ${({theme}) => theme.colors.tooltipTopBg};
    border-radius: 14px;
    color: #153055;
    margin-bottom: 32px;
`

const TooltipList = style.div`
    width: 100%;
    display: flex;
    align-items: center;
    line-height: 150%;
    color: ${({theme}) => theme.colors.toolListFont};
    justify-content: space-between;
    margin-bottom: 24px;
    &>.left {
        color: ${({theme}) => theme.colors.toolListFontLeft};
    }
    &>.leftTop {
        color: ${({theme}) => theme.colors.toolListFontLeftTop};
        font-weight: 700;
    }
    &:last-child {
        margin-bottom: 0px;
    }
`

const Baseline = style.div`
    width: 100%;
    height: 1px;
    background: linear-gradient(180deg, rgba(48, 79, 253, 0.2) 0%, rgba(169, 116, 255, 0.2) 100%);
    opacity: 0.7;
    margin-bottom: 24px;
`
const TooltipContent = style.div`
    background-color: ${({theme}) => theme.colors.tooltipBg};
    width: 300px;
    font-size: 15;
    border: ${({theme}) => theme.colors.tooltipBorder};
    box-shadow: 0px 3px 14px rgba(112, 144, 176, 0.08);
    border-radius: 20px;
    padding: 18px 22px;
    color: ${({theme}) => theme.colors.tooltipFont};
`

const Doubt = ({content,type}) => {
    //type === 1  => Gray picture background
    console.log('content===',content);
    const showClick = () => {
        console.log(222222);
    }

    return (
        <HtmlTooltip
            title={
                !content?
              <TooltipContent>
                {/* <Typography color="inherit">Tooltip with HTML</Typography>
                <em>{"And here's"}</em> <b>{'some'}</b> <u>{'amazing content'}</u>.{' '}
                {"It's very engaging. Right?"} */}
                <TooltipTop>Reward Breakdown</TooltipTop>
                <TooltipList>
                    <div>Basic APR ($ANC)</div>
                    <div className="left">31.5%</div>
                </TooltipList>
                <TooltipList>
                    <div>Auto Farm APR ($PAVO)</div>
                    <div className="left">+75.13%</div>
                </TooltipList>
                <Baseline />
                <TooltipList>
                    <div>Total APY</div>
                    <div className="leftTop">190%</div>
                </TooltipList>
              </TooltipContent>:<TooltipContent>{content}</TooltipContent>
            }
        >
          <MyIconButton
            aria-label="expand row"
            size="medium"
            my_type={type}
            onClick={() => {showClick()}}
          >
            <img src={type === 1 ?doubtGrayImg :doubtImg} alt="" />
        </MyIconButton>
      </HtmlTooltip>
        
    )
}

export default Doubt