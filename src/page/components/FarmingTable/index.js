import { useState,Fragment,useEffect} from 'react';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import ArrowDown from '../../../img/icon/Arrow-Down.svg';
import { styled } from '@mui/system';
import style from 'styled-components';
import MyButton from '../MyButton';
import * as echarts from 'echarts/core';
import { GridComponent } from 'echarts/components';
import { LineChart } from 'echarts/charts';
import { UniversalTransition } from 'echarts/features';
import { CanvasRenderer } from 'echarts/renderers';

const ImgUp = style.img`
  transform: rotate(180deg);
`

const BoxLeft = style.div`
  padding-right: 4%;
  border-right: 1px solid #ccc;
  margin-right: 4%;
`

const Tit = style.div`
  font-weight: 500;
  font-size: 20px;
  line-height: 30px;
  color: #3F434A;
  margin-bottom: 24px;
`

const BoxLeftItem =  style.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 15px;
  line-height: 150%;
  margin-bottom: ${({last}) => last?'27px':'8px'};
  .left {
    color: ${({last}) => last?'#304FFD':'#7B84A3'};
  }
  .right {
    margin-left: 55px;
    color: ${({last}) => last?'#304FFD':'#153055'};
  }
`
const BoxRight = style.div`
  width: 100%;
  flex: 1;
`

const TableDiv = style.div`
  width: 100%;
  height: 200px;
  &>div {
    width: 100%;
    height: 200px;
  }
`

const MyTableContainer = styled(TableContainer)({
  boxShadow: 'none',
  borderRadius: 0,
  marginBottom: 0,
})

const MyIconButton = styled(IconButton)({
  background: 'linear-gradient(91.11deg, rgba(124, 141, 236, 0.15) 14.08%, rgba(255, 203, 186, 0.15) 98.54%)',
  width: '25px',
  height: '25px',
})



echarts.use([GridComponent, LineChart, CanvasRenderer, UniversalTransition]);


function createData(name, calories, fat, carbs, protein, price) {
  return {
    name,
    calories,
    fat,
    carbs,
    protein,
    price,
    history: [
      {
        date: '2020-01-05',
        customerId: '11091700',
        amount: 3,
      },
      {
        date: '2020-01-02',
        customerId: 'Anonymous',
        amount: 1,
      },
    ],
  };
}

function Row(props) {
  const { row , index} = props;
  const [open, setOpen] = useState(false);
  useEffect(() => {
    
  },[index])

  const showClick = (index) =>{
    setOpen(!open)
    setTimeout(()=>{
      let chartDom = document.getElementById(`table_main_${index+1}`);
      console.log('chartDom===',chartDom);
      console.log('index===',index);
      if(!chartDom) return
      let myChart = echarts.init(chartDom);
      let option;

      option = {
        xAxis: {
          type: 'category',
          data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
        },
        yAxis: {
          type: 'value'
        },
        series: [
          {
            data: [820, 932, 901, 934, 1290, 1330, 1320],
            type: 'line',
            smooth: true,
            symbol: 'none',
            areaStyle: {
              // 填充色渐变
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                { offset: 0, color: "#3aa7ff" },
                { offset: 0.6, color: "rgba(48, 79, 253, 0.2)" },
                { offset: 1, color: "rgba(169, 116, 255, 0)" }
              ])
            },
          }
        ],
        tooltip : {
          trigger: 'axis',
          axisPointer: {
              type: 'cross',//指示类型
              label: {
                // 横纵坐标指示区块颜色
                  backgroundColor: '#6a7985'
              }
          }
        }
      };

      option && myChart.setOption(option);
    })
    
  }
  
  return (
    <Fragment>
      {/* <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}> */}
      <TableRow>
        <TableCell component="th" scope="row">
          {row.name}
        </TableCell>
        <TableCell align="right">{row.calories}</TableCell>
        <TableCell align="right">{row.fat}</TableCell>
        <TableCell align="right">{row.carbs}</TableCell>
        <TableCell align="right">{row.protein}</TableCell>

        <TableCell align="center">
          <MyIconButton
            aria-label="expand row"
            size="medium"
            onClick={() => {showClick(index)}}
          >
            {open ?  <img src={ArrowDown} alt =""/> : <ImgUp src={ArrowDown} alt =""/>}
          </MyIconButton>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell padding = "none"  style={{ paddingBottom: 0, paddingTop: 0}} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{bgcolor: '#fdfcfe',m: 0,p: '25px 45px',display: 'flex',}} >
              <BoxLeft >
                <Tit>Asset Details</Tit>

                <BoxLeftItem>
                  <div className="left">mAPPL</div>
                  <div className="right">17.39</div>
                </BoxLeftItem>
                <BoxLeftItem>
                  <div className="left">UST</div>
                  <div className="right">2500</div>
                </BoxLeftItem>
                <BoxLeftItem>
                  <div className="left">Est. Daily Earning</div>
                  <div className="right">$136.98</div>
                </BoxLeftItem>
                <BoxLeftItem last={true}>
                  <div className="left">Pending Reward</div>
                  <div className="right">$100 (2.4 Pavo)</div>
                </BoxLeftItem>

                <MyButton backgc={'bule'}>Claim</MyButton>

              </BoxLeft>
              <BoxRight >
                <div>
                  <Tit>Change in Value</Tit>
                </div>
                <TableDiv>
                  <div id={`table_main_${index+1}`}></div>
                </TableDiv>
              </BoxRight>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </Fragment>
  );
}


const rows = [
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0, 3.99),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3, 4.99),
  createData('Eclair', 262, 16.0, 24, 6.0, 3.79),
  createData('Cupcake', 305, 3.7, 67, 4.3, 2.5),
  createData('Gingerbread', 356, 16.0, 49, 3.9, 1.5),
];

export default function CollapsibleTable() {
  return (
    <MyTableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell>Platform</TableCell>
            <TableCell align="right">Asset</TableCell>
            <TableCell align="right">Value/Quanty</TableCell>
            <TableCell align="right">REWARD</TableCell>
            <TableCell align="right">Total APy</TableCell>
            <TableCell />
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row,index) => (
            <Row key={row.name} index={index} row={row} />
          ))}
        </TableBody>
      </Table>
    </MyTableContainer>
  );
}