import styled from 'styled-components';
import PiechartImg from '../../../public/icon/Piechart.svg';
import PiechartDrakImg from '../../../public/icon/PiehartDark.svg';
// import SelectBox from '../SelectBox';
import DonutChart from '../DonutChart';
import AssetsItem from './AssetsItem';
import {rmoney} from '../../../utils/convertFloat';

const RightDiv = styled.div`
  flex: 2;
  height: 302px;
  margin-left: 18px;
  background: ${({theme})=> theme.colors.Leftbackground};
  border-radius: 14px;
  padding: 22px 45px 0 45px;
  @media (max-width: 1025px) {
    flex:1;
    margin-left: 0px;
    padding: 18px 18px 32px 18px;
    height: 100%;
  }
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
  @media (max-width: 1025px) {
    flex-wrap: wrap;
  }
`

const AssetsDiv = styled.div`
  width: 100%;
  height: 170px;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  &>div {
    width: calc((100% - 14px) / 2);
    height: calc((100% - 13px) / 2);
    @media (max-width: 1025px) {
      width: calc((100% - 12px) / 2);
      height: 75px;
    }
  }
`

// const arr = ['By Platforms','By Assets','By Types']
// const arrItem = [1,2,3,4]


const RightBox = ({theme,isMobile,assets}) => {
    // console.log('assets===============assets=====assets',assets);
    let AssetsItemArr = null
    let OthersItemArr = [
      {name: 'Others'},
      {name: 'Others'},
      {value: '0'},
      {price: '0'},
      {value: 0},
    ]
    const OldTotal = assets.totalValue
    let total = assets.totalValue
    const assetsMap = (isOther) => {
      AssetsItemArr.map((item,index)=>{
        if(isOther){
          total -= rmoney(item[4]?.value)
        }
        AssetsItemArr[index][5] = {percentage: (rmoney(item[4].value) / OldTotal * 100).toFixed(1)}
        AssetsItemArr[index][4].value = rmoney(AssetsItemArr[index][4].value)
        return null
      })
    }
    if(assets.data.length >= 4){
      AssetsItemArr = assets.data.slice(0,3)
      AssetsItemArr.push(OthersItemArr)
      assetsMap(true)
      const otherTotal = +total.toFixed(3)
      const ArrLen = AssetsItemArr.length-1
      AssetsItemArr[ArrLen][4].value = otherTotal
      AssetsItemArr[ArrLen][5] = {percentage: (otherTotal/OldTotal * 100).toFixed(1)}
    }else{
      AssetsItemArr = assets.data
      assetsMap()
    }
    // console.log('AssetsItemArr===========',AssetsItemArr);

    return (
      <RightDiv isMobile={isMobile}>
          <Breakdown>
            <div className="break_down">Breakdown <img src={theme==='dark'?PiechartDrakImg:PiechartImg} alt="" /></div>
            {/* <SelectBox options={arr} theme={theme} sort="select"/> */}
          </Breakdown>
          <BreakdownBot>
              <DonutChart AssetsItemArr={AssetsItemArr} assets={assets} theme={theme} isMobile={isMobile}/>
              <AssetsDiv>
                {AssetsItemArr && AssetsItemArr.map((item,index)=>{
                  return <AssetsItem data={item} index={index} key={index}/>
                })}
              </AssetsDiv>
          </BreakdownBot>
      </RightDiv>
    )
}

export default RightBox