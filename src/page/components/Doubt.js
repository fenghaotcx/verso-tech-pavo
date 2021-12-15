import IconButton from '@mui/material/IconButton';
import { styled } from '@mui/system';
import doubtImg from '../../img/icon/doubt.svg'
import doubtGrayImg from '../../img/icon/doubtGray.svg'
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';
// import Typography from '@mui/material/Typography';
import style from 'styled-components';


const MyIconButton = styled(IconButton)`
    background: none;
    width: 15px;
    height: 15px;
    border: ${({type})=>type? '1.5px solid #A3AED0': '1.5px solid #FFFFFF'};
    display: flex;
    align-items: center;
    margin:0 5px;
`

const HtmlTooltip = styled(({ className, ...props }) => (
    <Tooltip {...props} placement="left-start" classes={{ popper: className }} />
  ))(({ theme }) => ({
    [`& .${tooltipClasses.tooltip}`]: {
      backgroundColor: '#fff',
      width: 300,
      fontSize: 15,
      border: '1px solid #EEF1FF',
      boxShadow: '0px 3px 14px rgba(112, 144, 176, 0.08)',
      borderRadius: '20px',
      padding: '18px 22px',
      color: '#000'
    },
}));

const TooltipTop = style.div`   
    width: 100%;
    height: 49px;
    display: flex;
    align-items: center;
    font-size: 15px;
    padding-left: 18px;
    background: linear-gradient(269deg, rgba(124, 141, 236, 0.15) 27.25%, rgba(186, 255, 238, 0.15) 93.09%);
    border-radius: 14px;
    color: #153055;
    margin-bottom: 32px;
`

const TooltipList = style.div`
    width: 100%;
    display: flex;
    align-items: center;
    line-height: 150%;
    color: #7B84A3;
    justify-content: space-between;
    margin-bottom: 24px;
    &>.left {
        color: #153055;
    }
    &>.leftTop {
        color: #304FFD;
        font-weight: 500;
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
              <>
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
              </>:<div>{content}</div>
            }
        >
          <MyIconButton
            aria-label="expand row"
            size="medium"
            type={type === 1}
            onClick={() => {showClick()}}
          >
            <img src={type === 1 ?doubtGrayImg :doubtImg} alt="" />
        </MyIconButton>
      </HtmlTooltip>
        
    )
}

export default Doubt