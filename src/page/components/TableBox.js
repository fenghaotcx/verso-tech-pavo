import styled from 'styled-components';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';

const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

const MyFormControlLabel = styled(FormControlLabel)({
  '&>.css-ahj2mt-MuiTypography-root': {
    fontSize: 12,
    fontFamily: 'Poppins',
  }
})

const TableDiv = styled.div`
  width: 100%;
  background: #FFFFFF;
  box-shadow: -4px 8px 24px rgba(44, 63, 88, 0.04);
  border-radius: 20px;
  margin-bottom: 30px;
  ${({marginType,isMobile})=> marginType && isMobile?'margin-top:28px;':''}
`

const TableBoxTop =  styled.div`
  height: 107px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-bottom: 1px solid #ccc;
`

const TableBoxBot =  styled.div`
  height: 25px;
`

const TableBoxTopCont =  styled.div`
  height: 48px;
  width: ${({isMobile,isNoTable})=> isMobile && isNoTable ?'100%':'94%'};
  padding: 0 25px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: linear-gradient(269deg, rgba(124, 141, 236, 0.15) 27.25%, rgba(186, 247, 255, 0.15) 93.09%);
  border-radius: 14px;
  &>.tit {
    font-weight: 700;
    font-size: ${({isMobile})=> isMobile ?'12px':'20px'};
    color: #37D7E1;
    ${({isMobile})=> isMobile ?'margin-right: 20px;':''}
  }
  &>.right {
    display: flex;
    align-items: center;
    &>.right_total {
      font-weight: 700;
      font-size: ${({isMobile})=> isMobile ?'12px':'20px'};
      color: #304FFD;
      margin-left: 50px;
    }
  }
`

const RightCheckDiv =  styled.div`
  font-size: ${({isMobile})=> isMobile ?'12px':'16px'};
  color: #7B84A3;
  ${({isMobile})=> isMobile ?'text-align: end;':''}
`

const RightCheck = ({isMobile}) => <RightCheckDiv isMobile={isMobile}>
  <MyFormControlLabel control={<Checkbox {...label}  size="small" />} label="Hide small balances" />
</RightCheckDiv>

const TableBoxTopContCom =({name,total,isMobile,isNoTable}) => {
  return (
    <TableBoxTopCont isMobile={isMobile} isNoTable={isNoTable}>
      <div className="tit">{name}</div>
      <div className="right">
        {!isMobile ?<RightCheck isMobile={isMobile}/>:<></>}
        <div className="right_total">Total ${total}</div>
      </div>
    </TableBoxTopCont>
  )
}

function TableBox({children,name='Wallet Balances',isMobile,total='10,000',isNoTable,marginType}) {
  return (
    isMobile && isNoTable?
    <>
      <TableBoxTopContCom isNoTable={isNoTable} name={name} isMobile={isMobile} total={total}/>
      <RightCheck isMobile={isMobile}/>
      {children}
    </>
    :
    <TableDiv isMobile={isMobile} marginType={marginType}>
      <TableBoxTop>
        <TableBoxTopContCom isNoTable={isNoTable}  name={name} isMobile={isMobile} total={total}/>
      </TableBoxTop>
      {isMobile  && <RightCheck />}
      {children}
      <TableBoxBot />
    </TableDiv>
  )
}

export default TableBox;