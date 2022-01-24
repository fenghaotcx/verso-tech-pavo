import { useState,Fragment,useEffect} from 'react';
import Box from '@mui/material/Box';
// import Collapse from '@mui/material/Collapse';
// import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
// import ArrowDown from '../../../public/icon/Arrow-Down.svg';
import { styled } from '@mui/system';
// import style from 'styled-components';
// import MyButton from '../MyButton';
import * as echarts from 'echarts/core';
import { GridComponent } from 'echarts/components';
import { LineChart } from 'echarts/charts';
import { UniversalTransition } from 'echarts/features';
import { CanvasRenderer } from 'echarts/renderers';
import TableSortLabel from '@mui/material/TableSortLabel';
import { visuallyHidden } from '@mui/utils';
import TablePagination from '@mui/material/TablePagination';
import IconNameLink from '../IconNameLink';
// import CodeBlock from '../CodeBlock';
import { makeStyles } from '@mui/styles';
import {convertToFloatValue,rmoney} from '../../../utils/convertFloat';

const useStyles = makeStyles({
  root: {
    '&.MuiPaper-root': {
      background: ({theme}) => theme === 'dark'?'#262A4F':'#fff',
    },
    '& .MuiTableCell-root': {
      fontFamily: 'Poppins',
      borderBottom: ({theme,isMobile}) => isMobile?'none':theme === 'dark'?'1px solid #404572':'1px solid #ede9fe',
    },
    '& .MuiTableBody-root .MuiTableCell-root': {
      color: ({theme}) => theme === 'dark'?'#fff':'#153055',
    },
    '& .MuiTableHead-root .MuiTableCell-root': {
      color: '#A3AED0',
      '& .Mui-active': {
        color: '#A3AED0',
      }
    },
    '& .Mui-selected': {
      background: 'linear-gradient(270.23deg, #7C9EF1 3.66%, #986FC1 38.95%, #6BCCD1 97.74%)',
    },
    '& .MuiSvgIcon-root': {
      color: ({theme}) => theme === 'dark'?'#fff':'rgba(0, 0, 0, 0.54)',
    },
  },
});

// const ImgUp = style.img`
//   transform: rotate(180deg);
// `

// const BoxLeft = style.div`
//   padding-right: 4%;
//   border-right: 1px solid #ccc;
//   margin-right: 4%;
//   @media (max-width: 1025px) {
//     width: calc((100vw - 60px));
//     padding-right: 0;
//     border-right: none;
//     margin-right: 0;
//     margin-bottom: 40px;
//   }
// `

// const Tit = style.div`
//   font-weight: 700;
//   font-size: 20px;
//   line-height: 30px;
//   color: ${({theme})=> theme.colors.logoFont};
//   margin-bottom: 24px;
// `

// const BoxLeftItem =  style.div`
//   display: flex;
//   align-items: center;
//   justify-content: space-between;
//   font-size: 15px;
//   line-height: 150%;
//   margin-bottom: ${({last}) => last?'27px':'8px'};
//   .left {
//     color: ${({last}) => last?'#304FFD':'#7B84A3'};
//     white-space: nowrap;
//   }
//   .right {
//     margin-left: 55px;
//     color: ${({last,theme}) => last?'#304FFD':theme.colors.font};
//     text-align: right;
//     white-space: nowrap;
//   }
// `
// const BoxRight = style.div`
//   width: 100%;
//   flex: 1;
// `

// const TableDiv = style.div`
//   width: 100%;
//   height: 200px;
//   &>div {
//     width: 100%;
//     height: 200px;
//   }
//   @media (max-width: 1025px) {
//     width: calc((100vw - 60px));
//   }
// `

const MyTableContainer = styled(TableContainer)({
  boxShadow: 'none',
  borderRadius: 0,
  marginBottom: 0,
})

// const MyIconButton = styled(IconButton)({
//   background: 'linear-gradient(91.11deg, rgba(124, 141, 236, 0.15) 14.08%, rgba(255, 203, 186, 0.15) 98.54%)',
//   width: '25px',
//   height: '25px',
// })

const headCells = [
  {
    id: 'platform',
    numeric: true,
    disablePadding: false,
    label: 'Platform',
    align: 'left'
  },
  {
    id: 'asset',
    numeric: true,
    disablePadding: false,
    label: 'Asset',
    align: 'right',
  },
  {
    id: 'value',
    numeric: true,
    disablePadding: false,
    label: 'Value/Quanty',
    align: 'right',
  },
  {
    id: 'reward',
    numeric: true,
    disablePadding: false,
    label: 'REWARD',
    align: 'center',
  },
  {
    id: 'apy',
    numeric: true,
    disablePadding: false,
    label: 'Total APy',
    align: 'center',
  },
];

echarts.use([GridComponent, LineChart, CanvasRenderer, UniversalTransition]);

function Row(props) {
  const { row , index,isMobile,isItemSelected,labelId,theme,handleClick} = props;
  // const [open, setOpen] = useState(false);
  console.log('theme=====',theme);
  useEffect(() => {
    
  },[index])

  // const showClick = (index) =>{
  //   setOpen(!open)
  //   setTimeout(()=>{
  //     let chartDom = document.getElementById(`table_main_${index+1}`);
  //     console.log('chartDom===',chartDom);
  //     console.log('index===',index);
  //     if(!chartDom) return
  //     let myChart = echarts.init(chartDom);
  //     let option;

  //     option = {
  //       xAxis: {
  //         type: 'category',
  //         data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
  //       },
  //       yAxis: {
  //         type: 'value'
  //       },
  //       series: [
  //         {
  //           data: [820, 932, 901, 934, 1290, 1330, 1320],
  //           type: 'line',
  //           smooth: true,
  //           symbol: 'none',
  //           areaStyle: {
  //             // 填充色渐变
  //             color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
  //               { offset: 0, color: "#3aa7ff" },
  //               { offset: 0.6, color: "rgba(48, 79, 253, 0.2)" },
  //               { offset: 1, color: "rgba(169, 116, 255, 0)" }
  //             ])
  //           },
  //         }
  //       ],
  //       tooltip : {
  //         trigger: 'axis',
  //         axisPointer: {
  //             type: 'cross',//指示类型
  //             label: {
  //               // 横纵坐标指示区块颜色
  //                 backgroundColor: '#6a7985'
  //             }
  //         }
  //       }
  //     };

  //     option && myChart.setOption(option);
  //   })
    
  // }
  
  return (
    <Fragment>
      {/* <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}> */}
      <TableRow 
        selected={isItemSelected} 
        aria-checked={isItemSelected}
        onClick={(event) => handleClick(event, row.platform)}
        role="checkbox"
        hover
      >
        {!isMobile && <TableCell padding="checkbox" />}
        {!isMobile && <TableCell id={labelId} align="left" component="th" scope="row">
          <IconNameLink isMobile={isMobile} name={row.platform} />
        </TableCell>}
        <TableCell align="right">{row.asset}</TableCell>
        <TableCell align="right">
          <div>{row.value}</div>
          <div>{row.value_token}</div>
        </TableCell>
        <TableCell align="center">
          <div>${convertToFloatValue(row.reward)}</div>
          <div>{row.reward_token}</div>
          {/* <CodeBlock isMobile={isMobile} color="grey">Re-staked</CodeBlock> */}
        </TableCell>
        <TableCell align="center">
          <div>{row.apy}</div>
          {/* <CodeBlock isMobile={isMobile}>Auto Farming</CodeBlock> */}
        </TableCell>

        {/* {!isMobile && 
          <TableCell align="center">
            <MyIconButton
              aria-label="expand row"
              size="medium"
              onClick={() => {showClick(index)}}
            >
              {open ?  <img src={ArrowDown} alt =""/> : <ImgUp src={ArrowDown} alt =""/>}
            </MyIconButton>
          </TableCell>
        } */}
      </TableRow>
      {/* {!isMobile && 
        <TableRow>
          <TableCell padding = "none"  style={{ paddingBottom: 0, paddingTop: 0}} colSpan={7}>
            <Collapse in={open} timeout="auto" unmountOnExit>
              <Box sx={{bgcolor: theme==='dark'?'#262A4F':'#fdfcfe',m: 0,p: isMobile?'20px':'25px 45px',display: 'flex',flexWrap: isMobile?'wrap':'nowrap',width:isMobile?'100vw':'100%'}} >
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
      } */}
    </Fragment>
  );
}

function EnhancedTableHead(props) {
  const { order, orderBy, onRequestSort,isMobile } =
    props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        {!isMobile && <TableCell padding="checkbox" />}
        {headCells.map((headCell,index) => {
          if(headCell.id === 'fat' && isMobile){
            headCell.label = <>Value/<br />Quanty</>
          }
          if(index===0 && isMobile){
            return null
          }else{
            return(
              <TableCell
                key={headCell.id}
                align={headCell.align}
                padding={isMobile ? 'none' : 'normal'}
                sortDirection={orderBy === headCell.id ? order : false}
              >
                <TableSortLabel
                  active={orderBy === headCell.id}
                  direction={orderBy === headCell.id ? order : 'asc'}
                  onClick={createSortHandler(headCell.id)}
                >
                  {headCell.label}
                  {orderBy === headCell.id ? (
                    <Box component="span" sx={visuallyHidden}>
                      {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                    </Box>
                  ) : null}
                </TableSortLabel>
              </TableCell>
            )
          }
        })}
        {/* {!isMobile && <TableCell /> } */}
      </TableRow>
    </TableHead>
  );
}

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}


export default function FarmingTable(props) {
  const {isMobile,windowWidth,theme,specFarm,specReward,starterraFarms} = props
  console.log('specFarm==========',specFarm);
  console.log('specReward==========',specReward);
  let data = []
  if(JSON.stringify(starterraFarms) !== '{}' && starterraFarms){
    console.log('starterraFarms==========starterraFarms============',starterraFarms);
    data = starterraFarms.data.map(item=>{
      return {
        platform: 'StarTerra',
        asset: item[0].name,
        value: item[2].lpData.token1,
        value_token: item[2].lpData.token2,
        reward: rmoney(item[5].reward.tokenValue),
        reward_token: item[5].reward.token,
        apy: '-',
      }
    })
  }

  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('calories');
  const [selected, setSelected] = useState([]);
  const [dense] = useState(isMobile);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [page, setPage] = useState(0);
  const classes = useStyles(props);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }

    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const isSelected = (name) => selected.indexOf(name) !== -1;

  return (
    <>
      <MyTableContainer className={classes.root} theme={theme} component={Paper}>
        <Table 
          sx={{ minWidth: isMobile?windowWidth-20:750,fontSize:isMobile?'13px':'16px',background:theme==='dark'?'#262A4F':'#fff'}}
          aria-label="collapsible table"
          // className={classes.root}
          size={dense ? 'small' : 'medium'}
        >
          <EnhancedTableHead
            order={order}
            orderBy={orderBy}
            onRequestSort={handleRequestSort}
            rowCount={data.length}
            isMobile={isMobile}
            windowWidth={windowWidth}
          />
          <TableBody>
          {stableSort(data, getComparator(order, orderBy))
            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            .map((row, index) => {
              const labelId = `enhanced-table-checkbox-${index}`;
              const isItemSelected = isSelected(row.platform);
            return (
              <Row theme={theme} 
                isItemSelected={isItemSelected} 
                handleClick={handleClick} 
                windowWidth={windowWidth} 
                labelId={labelId} 
                isMobile={isMobile} 
                key={row.platform} 
                index={index} 
                row={row}
              />
            );
          })}
          </TableBody>
        </Table>
      </MyTableContainer>
      <TablePagination
        className={classes.root}
        sx={{ color:theme==='dark'?'#fff':'#000' }}
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={data.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </>
  );
}