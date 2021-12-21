import styled from 'styled-components'
import PiechartImg from '../../../public/icon/Piechart.svg'
import PiechartDrakImg from '../../../public/icon/PiehartDark.svg'
import SelectBox from '../SelectBox'
import DonutChart from '../DonutChart'
import AssetsItem from './AssetsItem'

const RightDiv = styled.div`
  flex: ${({isMobile})=> isMobile?'1':'2'};
  height: ${({isMobile})=> isMobile?'100%':'302px'};
  margin-left: ${({isMobile})=> isMobile?'0':'18px'};
  background: ${({theme})=> theme.colors.Leftbackground};
  border-radius: 14px;
  padding: ${({isMobile})=> isMobile?'18px 18px 32px 18px':'22px 45px 0 45px'};
` 

const Breakdown = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 22px;
  & .break_down {
    display: flex;
    align-items: center;
    font-weight: 700;
    font-size: 20px;
    color: ${({theme})=> theme.colors.font};
    & img {
        margin-left: 8px;
        width: 24px;
    }
  }
`

const BreakdownBot = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  ${({isMobile})=> isMobile?'flex-wrap: wrap;':''}
`

const AssetsDiv = styled.div`
  width: 100%;
  height: 170px;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  &>div {
    width: ${({isMobile})=> isMobile?'calc((100% - 12px) / 2)':'calc((100% - 14px) / 2)'};
    height:${({isMobile})=> isMobile?'75px':'calc((100% - 13px) / 2)'};
  }
`

const arr = ['By Platforms','By Assets','By Types']
const arrItem = [1,2,3,4]


const RightBox = ({theme,isMobile}) => {
    return (
      <RightDiv isMobile={isMobile}>
          <Breakdown>
            <div className="break_down">Breakdown <img src={theme==='dark'?PiechartDrakImg:PiechartImg} alt="" /></div>
            <SelectBox options={arr} theme={theme} sort="select"/>
          </Breakdown>
          <BreakdownBot isMobile={isMobile}>
              <DonutChart />
              <AssetsDiv isMobile={isMobile}>
                  {arrItem.map((item,index)=>{
                      return <AssetsItem item={item} key={index}/>
                  })}
              </AssetsDiv>
          </BreakdownBot>
      </RightDiv>
    )
}

export default RightBox
