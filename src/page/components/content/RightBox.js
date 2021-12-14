import styled from 'styled-components'
import PiechartImg from '../../../img/icon/Piechart.svg'
import SelectBox from '../SelectBox'
import DonutChart from '../DonutChart'
import AssetsItem from './AssetsItem'

const RightDiv = styled.div`
  flex:2;
  height: 302px;
  margin-left: 18px;
  background: #FFFFFF;
  border-radius: 14px;
  padding: 22px 45px 0 45px;
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
    font-weight: 500;
    font-size: 20px;
    color: #153055;
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
`

const AssetsDiv = styled.div`
  width: 100%;
  height: 170px;
  display: flex;
  justify-content:space-between;
  flex-wrap: wrap;
  &>div {
    width: calc((100% - 14px) / 2);
    height: calc((100% - 13px) / 2);
  }
`

const arr = ['By Platforms','By Assets','By Types']
const arrItem = [1,2,3,4]


const RightBox = () => {
    return (
        <RightDiv>
            <Breakdown>
              <div className="break_down">Breakdown <img src={PiechartImg} alt="" /></div>
              <SelectBox options={arr}  sort="select"/>
            </Breakdown>
            <BreakdownBot>
                <DonutChart />
                <AssetsDiv>
                    {arrItem.map((item,index)=>{
                        return <AssetsItem item={item} key={index}/>
                    })}
                </AssetsDiv>
            </BreakdownBot>
        </RightDiv>
    )
}

export default RightBox