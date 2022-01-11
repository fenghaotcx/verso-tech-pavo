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
    console.log('assets===============assets=====assets',assets);
    let AssetsItemArr = null
    let OthersItemArr = [
      {name: 'Others'},
      {name: 'Others'},
      {value: '0'},
      {price: '0'},
      {value: 0},
    ]
    if(assets?.data?.length>=4){
      AssetsItemArr = assets.data.slice(0,3)
      console.log('AssetsItemArr===========',AssetsItemArr);
      OthersItemArr[4].value  = assets.totalValue
      AssetsItemArr.map((item,index)=>{
        OthersItemArr[4].value -= rmoney(item[4]?.value)
        AssetsItemArr[index][4].value = rmoney(AssetsItemArr[index][4].value)
        return null
      })
      OthersItemArr[4].value = +OthersItemArr[4].value.toFixed(3)
      AssetsItemArr.push(OthersItemArr)
    }
    
    console.log('AssetsItemArr===========',AssetsItemArr);

    return (
      <RightDiv isMobile={isMobile}>
          <Breakdown>
            <div className="break_down">Breakdown <img src={theme==='dark'?PiechartDrakImg:PiechartImg} alt="" /></div>
            {/* <SelectBox options={arr} theme={theme} sort="select"/> */}
          </Breakdown>
          <BreakdownBot>
              <DonutChart assets={assets} theme={theme} isMobile={isMobile}/>
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