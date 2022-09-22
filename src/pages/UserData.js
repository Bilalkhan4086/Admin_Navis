import { filter } from 'lodash';
import { useEffect, useState } from 'react';
// material
import {
  Card,
  Table,
  Stack,
  TableRow,
  TableBody,
  TableCell,
  Container,
  Typography,
  TableContainer,
  TablePagination,
  Box,
} from '@mui/material';
import {useSnackbar} from "notistack"
import { adminRoutes } from "../api/requests";

// components
import ShowHideColumn from '../components/ShowHideColumn';
import Page from '../components/Page';
import Scrollbar from '../components/Scrollbar';
import SearchNotFound from '../components/SearchNotFound';
import { UserListHead, UserListToolbar, UserMoreMenu } from '../sections/@dashboard/facebook';
import CustomDateRangePicker from '../components/CustomDateRangePicker';
// mock
import USERLIST from '../_mock/user';

// ----------------------------------------------------------------------
const TABLE_HEAD = [
  { id: 'fullName', label: 'Full Name', alignRight: false },
  { id: 'userName', label: 'User Name', alignRight: false },
  { id: 'role', label: 'Role', alignRight: false },
  { id: 'status', label: 'Status', alignRight: false },
  { id: 'createdAt', label: 'Created At', alignRight: false },
  { id: 'Actions', label: 'Actions', alignRight: false },
];

const data = [
  {
    fullName: 'Muhammad Ali',
    userName: 'MAli123',
    role: 'client',
    createdAt: '2022-09-21',
  },
  {
    fullName: 'Muhammad Bilal',
    userName: 'MBilal123',
    role: 'client',
    createdAt: '2022-09-21',
  },
];

// ----------------------------------------------------------------------

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

function applySortFilter(array, comparator, query) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  if (query) {
    return filter(array, (_user) => _user.campaignName.toLowerCase().indexOf(query.toLowerCase()) !== -1);
  }
  return stabilizedThis.map((el) => el[0]);
}
const today = new Date();
function addDays(date, days) {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
}
export default function User() {
  const {enqueueSnackbar} = useSnackbar();
  const [userData, setUserData] = useState([]);

  const [page, setPage] = useState(0);

  const [order, setOrder] = useState('asc');

  const [selected, setSelected] = useState([]);

  const [orderBy, setOrderBy] = useState('name');

  const [filterName, setFilterName] = useState('');

  const [rowsPerPage, setRowsPerPage] = useState(5);

  const [columnsState, setColumnsState] = useState(5);

  const [fetchDataOnCreateNewUser,setFetchDataOnCreateNewUser] = useState(false);

  const [dateRangeState, setDateRangeState] = useState({ startDate: addDays(today, -7), endDate: today });

  const fetchUserData = async () => {
    try{
      const { data } = await adminRoutes.getAllUsers();
      console.log("data",data)
    setUserData(data.users);
    }
    catch(e){
      enqueueSnackbar(e.response.data.error, {
        variant: 'error',
      });
    }
  };

  useEffect(() => {
    fetchUserData();
  }, [fetchDataOnCreateNewUser]);


  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = userData.map((n) => n.name);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleFilterByName = (event) => {
    setFilterName(event.target.value);
  };

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - userData.length) : 0;

  const filteredUsers = applySortFilter(userData, getComparator(order, orderBy), filterName);

  const isUserNotFound = filteredUsers.length === 0;

  return (
    <Page title="Clients">
      <Container maxWidth="xl">
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Clients
          </Typography>
          <ShowHideColumn toggle={()=>{setFetchDataOnCreateNewUser(!fetchDataOnCreateNewUser)}} />
          {/* <Button variant="contained" component={RouterLink} to="#" startIcon={<Iconify icon="eva:plus-fill" />}>
            New User
          </Button> */}
        </Stack>

        <Card>
          {/* <Box p={2}>
            <CustomDateRangePicker dateRangeState={dateRangeState} setDateRangeState={setDateRangeState} />
          </Box> */}
          <Box>
            <UserListToolbar
              dateRangeState={dateRangeState}
              setDateRangeState={setDateRangeState}
              filterName={filterName}
              onFilterName={handleFilterByName}
            />

            <Box px={2}>
              <Scrollbar>
                <TableContainer sx={{ minWidth: 800 }}>
                  <Table padding="4">
                    <UserListHead
                      order={order}
                      orderBy={orderBy}
                      headLabel={TABLE_HEAD.filter((value) => columnsState[value.id] !== true)}
                      rowCount={filteredUsers.length}
                      numSelected={selected.length}
                      onRequestSort={handleRequestSort}
                      onSelectAllClick={handleSelectAllClick}
                    />
                    <TableBody>
                      {filteredUsers.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                        const { fullName, userName, createdAt, role, status } = row;
                        // const isItemSelected = selected.indexOf(name) !== -1;

                        return (
                          <TableRow
                            hover
                            // key={id}
                            tabIndex={-1}
                            role="checkbox"
                            // selected={isItemSelected}
                            // aria-checked={isItemSelected}
                          >
                            {/* <TableCell padding="checkbox">
                          <Checkbox checked={false} />
                        </TableCell> */}
                            <TableCell align="left">
                              <Stack direction="row" alignItems="center" spacing={2}>
                                <Typography variant="body2" noWrap>
                                  {fullName}
                                </Typography>
                              </Stack>
                            </TableCell>
                            {!columnsState.userName && (
                              <TableCell align="left">
                                <Stack direction="row" alignItems="center" spacing={2}>
                                  <Typography variant="body2" noWrap>
                                    {userName}
                                  </Typography>
                                </Stack>
                              </TableCell>
                            )}
                            {!columnsState.role && (
                              <TableCell align="left">
                                <Stack direction="row" alignItems="center" spacing={2}>
                                  <Typography variant="body2" noWrap>
                                    {role}
                                  </Typography>
                                </Stack>
                              </TableCell>
                            )}
                            {!columnsState.status && (
                              <TableCell align="left">
                                <Stack direction="row" alignItems="center" spacing={2}>
                                  <Typography variant="body2" noWrap>
                                    {status}
                                  </Typography>
                                </Stack>
                              </TableCell>
                            )}
                            {!columnsState.createdAt && (
                              <TableCell align="left">
                                <Stack direction="row" alignItems="center" spacing={2}>
                                  <Typography variant="body2" noWrap>
                                    {createdAt}
                                  </Typography>
                                </Stack>
                              </TableCell>
                            )}
                            <TableCell align="left">
                              <UserMoreMenu status={status} userName={userName} toggle={()=>{setFetchDataOnCreateNewUser(!fetchDataOnCreateNewUser)}}/>
                            </TableCell>
                          </TableRow>
                        );
                      })}
                      {emptyRows > 0 && (
                        <TableRow style={{ height: 53 * emptyRows }}>
                          <TableCell colSpan={6} />
                        </TableRow>
                      )}
                    </TableBody>

                    {isUserNotFound && (
                      <TableBody>
                        <TableRow>
                          <TableCell align="center" colSpan={8} sx={{ py: 3 }}>
                            <SearchNotFound searchQuery={filterName} />
                          </TableCell>
                        </TableRow>
                      </TableBody>
                    )}
                  </Table>
                </TableContainer>
              </Scrollbar>

              <TablePagination
                rowsPerPageOptions={[10, 25, 40]}
                component="div"
                count={userData.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
            </Box>
          </Box>
        </Card>
      </Container>
    </Page>
  );
}
