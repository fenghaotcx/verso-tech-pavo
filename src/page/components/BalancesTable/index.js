import { useState} from 'react';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Paper from '@mui/material/Paper';
import { visuallyHidden } from '@mui/utils';
import { styled } from '@mui/system';
// import style from 'styled-components';
// import PercentageNum from '../PercentageNum';
import IconNameLink from '../IconNameLink';
import { makeStyles } from '@mui/styles';
import {rmoney,convertToFloatValue} from '../../../utils/convertFloat';

const useStyles = makeStyles({
  root: {
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

const MyPaper = styled(Paper)({
  boxShadow: 'none',
  borderRadius: 0,
  marginBottom: 0,
})

// const FlexDiv = style.div`
//   display: flex;
//   justify-content: center;
// `

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

const headCells = [
  {
    id: 'name',
    numeric: true,
    disablePadding: false,
    label: 'Asset',
  },
  {
    id: 'value',
    numeric: false,
    disablePadding: false,
    label: 'Value',
  },
  {
    id: 'quantity',
    numeric: false,
    disablePadding: false,
    label: 'Quantity',
  },
  {
    id: 'price',
    numeric: false,
    disablePadding: false,
    label: 'Price',
  },
  // {
  //   id: 'Price',
  //   numeric: true,
  //   disablePadding: false,
  //   label: 'Price',
  // },
];

function EnhancedTableHead(props) {
  const { order, orderBy, onRequestSort, isMobile} =
    props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };
  return (
    <TableHead>
      <TableRow>
        {!isMobile && <TableCell padding="checkbox" />}
        {headCells.map((headCell) => {
          return (
            <TableCell
              key={headCell.id}
              align={headCell.numeric ? isMobile?'center':'left' : 'center'}
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
        })}
      </TableRow>
    </TableHead>
  );
}



export default function BalancesTable(props) {
  const {isMobile,windowWidth,theme,assets} = props;
  let data = []
  if(assets?.data){
    data = assets.data.map((item)=>{
      return {
        name: item[0].name || item[0].url,
        value: rmoney(item[4].value),
        quantity: rmoney(item[2].value),
        price: rmoney(item[3].price),
      }
    })
  }
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('calories');
  const [selected, setSelected] = useState([]);
  const [page, setPage] = useState(0);
  const [dense] = useState(isMobile);
  const [rowsPerPage, setRowsPerPage] = useState(5);
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

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - data.length) : 0;

  return (
    <Box sx={{ width: '100%' }}>
      <MyPaper sx={{ width: '100%', mb: 2,background:theme==='dark'?'#262A4F':'#fff' }}>
        <TableContainer sx={{ width: isMobile ? windowWidth-20 :'100%', overflow:isMobile?'hidden':'auto',}}>
          <Table
            sx={{ minWidth: isMobile?windowWidth-20:750,fontSize:isMobile?'13px':'16px'}}
            aria-labelledby="tableTitle"
            size={dense ? 'small' : 'medium'}
            className={classes.root}
          >
            <EnhancedTableHead
              order={order}
              orderBy={orderBy}
              onRequestSort={handleRequestSort}
              rowCount={data?.length||0}
              isMobile={isMobile}
              windowWidth={windowWidth}
            />
            <TableBody>
              {stableSort(data, getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  const isItemSelected = isSelected(row.name);
                  const labelId = `enhanced-table-checkbox-${index}`;
                  return (
                    <TableRow 
                      role="checkbox" 
                      tabIndex={-1} 
                      key={row.name} 
                      hover 
                      onClick={(event) => handleClick(event, row.name)}
                      aria-checked={isItemSelected}
                      selected={isItemSelected}
                    >
                      {!isMobile && <TableCell padding="checkbox"/>}
                      <TableCell component="th" id={labelId} scope="row" 
                        // padding="none"
                      >
                        <IconNameLink isMobile={isMobile} name={row.name} />
                      </TableCell>
                      <TableCell align="center">${convertToFloatValue(row.value)}</TableCell>
                      <TableCell align="center">{convertToFloatValue(row.quantity)}</TableCell>
                      <TableCell align="center">${convertToFloatValue(row.price)}</TableCell>
                      {/* {!isMobile && <TableCell align="center">
                        <FlexDiv>
                          <PercentageNum num={row.protein} type={index%2>=1?'rise':''}/>
                        </FlexDiv>
                      </TableCell>} */}
                    </TableRow>
                  );
                })}
              {emptyRows > 0 && (
                <TableRow
                  style={{
                    height: (dense ? 33 : 53) * emptyRows,
                  }}
                >
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          className={classes.root}
          sx={{ color:theme==='dark'?'#fff':'#000' }}
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={data?.length||0}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </MyPaper>
    </Box>
  );
}