import styled from 'styled-components'
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';

const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

const MyFormControlLabel = styled(FormControlLabel)({
  '&>.css-ahj2mt-MuiTypography-root': {
    fontSize: 12,
  }
})

const TableDiv = styled.div`
  width: 100%;
  background: #FFFFFF;
  box-shadow: -4px 8px 24px rgba(44, 63, 88, 0.04);
  border-radius: 20px;
  margin-bottom: 30px
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
  width:  94%;
  padding: 0 25px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: linear-gradient(269deg, rgba(124, 141, 236, 0.15) 27.25%, rgba(186, 247, 255, 0.15) 93.09%);
  border-radius: 14px;
  &>.tit {
    font-weight: 700;
    font-size: 20px;
    color: #37D7E1;
    @media (max-width: 1025px) {
      font-size: 12px;
      margin-right: 20px;
    }
  }
  &>.right {
    display: flex;
    align-items: center;
    &>.right_check {
      font-size: 16px;
      color: #7B84A3;
      @media (max-width: 1025px) {
        font-size: 12px;
      }
    }
    &>.right_total {
      font-weight: 700;
      font-size: 20px;
      color: #304FFD;
      margin-left: 50px;
      @media (max-width: 1025px) {
        font-size: 12px;
      }
    }
  }
`

function TableBox({children,name='Wallet Balances'}) {
  return (
    <TableDiv>
      <TableBoxTop>
        <TableBoxTopCont>
          <div className="tit">{name}</div>
          <div className="right">
            <div className="right_check">
              {/* <Checkbox {...label} defaultChecked size="small" /> */}
              <MyFormControlLabel control={<Checkbox {...label}  size="small" />} label="Hide small balances" />
            </div>
            <div className="right_total">Total  $10,000</div>
          </div>
        </TableBoxTopCont>
      </TableBoxTop>
      {children}
      <TableBoxBot />
    </TableDiv>
    
  );
}

export default TableBox;