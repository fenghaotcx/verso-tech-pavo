import styled from 'styled-components';
import ProgressBar from '../../../components/ProgressBar';
import {convertToFloatValue,rmoney} from '../../../../utils/convertFloat';

const CollateralDiv = styled.div`
  width:100%;
  box-shadow: -4px 8px 24px rgba(44, 63, 88, 0.02);
  border-radius: 20px;
  padding: 19px 13px;
  background: ${({theme})=> theme.colors.Leftbackground};
  margin-bottom: 12px;
  &>.flex_box {
      display: flex;
      margin-bottom: 20px;
      &>.flex_item {
        flex: 1;
        text-align: center;
        &:first-child {
          text-align: left;
        }
        &>.name {
          font-size: 12px;
          line-height: 18px;
          color: #A3AED0;
          margin-bottom: 13px;
        }
        &>.val {
          font-size: 14px;
          line-height: 21px;
        }
      }
  }
  &>.ratio {
    font-size: 12px;
    line-height: 18px;
    color: #A3AED0;
    margin-bottom: 13px;
  }
`

const oldArr = [
    {
        tit: 'Platform',
        val: ''
    },
    {
        tit: 'ASSET',
        val: ''
    },
    {
        tit: 'VALUE',
        val: '',
        percentage:'',
    }
]

const FlexItem = ({tit,val}) =>{
    return (
        <div className='flex_item'>
            <div className='name'>{tit}</div>
            <div className='val'>{val}</div>
        </div>
    )
}

const CollateralMoblie = ({isMobile,borrow}) => {
  let data = []
  if( borrow?.data?.length && borrow?.data[0][0]?.collateralList){
    data = borrow.data[0][0].collateralList.map(item=>{
      let arr = JSON.parse(JSON.stringify(oldArr))
      arr[0].val = borrow.data[0][4].Platform
      arr[1].val = item.symbol || ''
      arr[2].val = rmoney(item.tokenValue) || ''
      arr[2].percentage = borrow.percentage || ''
      return arr
    })
  }
  console.log('data=======',data);
  return (
    <>
      {data.length &&  data.map((item,index)=>{
        return(
          <CollateralDiv key={index}>
            <div className='flex_box'>
                {item.map((item,index)=> <FlexItem key={index} tit={item.tit}  val={item.tit ==='VALUE'?`$${convertToFloatValue(item.val)}`: item.val}/>)}
            </div>
            <div className='ratio'>COLLATERAL RATIO (60% Max)</div>
            <div>
              <ProgressBar isMobile= {isMobile} type={'Increase'} num={item[2].percentage} />
            </div>
          </CollateralDiv>
        )
        })
      }
    </>
  )
}

export default CollateralMoblie