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
import IconNameLink from '../IconNameLink';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles({
  root: {
    '& .css-11w94w9-MuiTableCell-root,& .css-1ndpvdd-MuiTableCell-root,& .css-10dfkli-MuiTableCell-root,& .css-1yhpg23-MuiTableCell-root': {
      borderBottom: ({isMobile}) => isMobile?'none':'1px solid rgba(224, 224, 224, 1)',
    },
  },
});

const MyPaper = styled(Paper)({
  boxShadow: 'none',
  borderRadius: 0,
  marginBottom: 0,
})

function createData(name, calories, fat, carbs,protein,apr) {
  return {
    name,
    calories,
    fat,
    carbs,
    protein,
    apr
  };
}

const rows = [
  createData('Cupcake', 305, 3.7, 67,20,10),
  createData('Donut', 452, 25.0, 51,20,20),
  createData('Eclair', 262, 16.0, 24,20,12),
  createData('Frozen yoghurt', 159, 6.0, 24,20,20),
  createData('Gingerbread', 356, 16.0, 49,20,16),
  createData('Honeycomb', 408, 3.2, 87,20,20),
  createData('Ice cream sandwich', 237, 9.0, 37,20,18),
  createData('Jelly Bean', 375, 0.0, 94,20,20),
  createData('KitKat', 518, 26.0, 65,20,12),
  createData('Lollipop', 392, 0.2, 98,20,20),
  createData('Marshmallow', 318, 0, 81,20,11),
  createData('Nougat', 360, 19.0, 9,20,20),
  createData('Oreo', 437, 18.0, 63,20,19),
];

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
    label: 'Platform',
  },
  {
    id: 'calories',
    numeric: true,
    disablePadding: false,
    label: 'Asset',
  },
  {
    id: 'fat',
    numeric: true,
    disablePadding: false,
    label: 'Value',
  },
  {
    id: 'carbs',
    numeric: true,
    disablePadding: false,
    label: 'Quantity',
  },
  {
    id: 'protein',
    numeric: true,
    disablePadding: false,
    label: 'Price',
  },
  {
    id: 'apr',
    numeric: true,
    disablePadding: false,
    label: 'Apr',
  },
  
];

function EnhancedTableHead(props) {
  const { order, orderBy, onRequestSort,isMobile} =
    props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };
  return (
    <TableHead>
      <TableRow>
        {!isMobile && <TableCell padding="checkbox" />}
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? isMobile?'center':'left' : 'left'}
            padding={headCell.disablePadding ? 'none' : 'normal'}
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
        ))}
      </TableRow>
    </TableHead>
  );
}



export default function BalancesTable(props) {
  const {isMobile,windowWidth} = props
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('calories');
  const [page, setPage] = useState(0);
  const [dense] = useState(isMobile);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const classes = useStyles(props);
  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };



  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  return (
    <Box sx={{ width: '100%' }}>
      <MyPaper sx={{ width: '100%', mb: 2 }}>
        <TableContainer sx={{ width: isMobile ? windowWidth-20 :'100%', overflow:isMobile?'hidden':'auto',}}>
          <Table
            sx={{ minWidth: isMobile?windowWidth-20:750,fontSize:isMobile?'13px':'16px' }}
            aria-labelledby="tableTitle"
            size={dense ? 'small' : 'medium'}
            className={classes.root}
          >
            <EnhancedTableHead
              order={order}
              orderBy={orderBy}
              onRequestSort={handleRequestSort}
              rowCount={rows.length}
              isMobile={isMobile}
              windowWidth={windowWidth}
            />
            <TableBody>
              {stableSort(rows, getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  const labelId = `enhanced-table-checkbox-${index}`;
                  return (
                    <TableRow role="checkbox" tabIndex={-1} key={row.name} hover>
                      {!isMobile && <TableCell padding="checkbox"/>}
                      <TableCell
                        component="th"
                        id={labelId}
                        scope="row"
                        padding="none"
                      >
                        <IconNameLink isMobile={isMobile} name={row.name} />
                      </TableCell>
                      <TableCell align="center">{row.calories}</TableCell>
                      <TableCell align="center">{row.fat}</TableCell>
                      <TableCell align="center">{row.carbs}</TableCell>
                      <TableCell align="center">{row.protein}</TableCell>
                      <TableCell align="center">
                        <div style={{color: row.apr>=20?'#FF7373':'#20CC8E'}}>{row.apr}%</div>
                      </TableCell>
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
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </MyPaper>
    </Box>
  );
}