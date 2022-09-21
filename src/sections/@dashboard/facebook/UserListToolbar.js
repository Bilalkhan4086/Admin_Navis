import PropTypes from 'prop-types';
// material
import { styled } from '@mui/material/styles';
import { Toolbar, Tooltip, IconButton, Typography, OutlinedInput, InputAdornment } from '@mui/material';
// component
import Iconify from '../../../components/Iconify';
import CustomDateRangePicker from '../../../components/CustomDateRangePicker';

// ----------------------------------------------------------------------

const RootStyle = styled(Toolbar)(({ theme }) => ({
  height: 96,
  display: 'flex',
  justifyContent: 'space-between',
  padding: theme.spacing(0, 1, 0, 3),
}));

const SearchStyle = styled(OutlinedInput)(({ theme }) => ({
  width: 240,
  transition: theme.transitions.create(['box-shadow', 'width'], {
    easing: theme.transitions.easing.easeInOut,
    duration: theme.transitions.duration.shorter,
  }),
  '&.Mui-focused': { width: 320, boxShadow: theme.customShadows.z8 },
  '& fieldset': {
    borderWidth: `1px !important`,
    borderColor: `${theme.palette.grey[500_32]} !important`,
  },
}));

// ----------------------------------------------------------------------

UserListToolbar.propTypes = {
  numSelected: PropTypes.number,
  filterName: PropTypes.string,
  onFilterName: PropTypes.func,
  setDateRangeState: PropTypes.func,
  dateRangeState: { startDate: PropTypes.any, endDate: PropTypes.any },
};

export default function UserListToolbar({ dateRangeState, setDateRangeState, filterName, onFilterName }) {
  return (
    <RootStyle>
      <SearchStyle
        value={filterName}
        onChange={onFilterName}
        size="small"
        placeholder="Search ..."
        startAdornment={
          <InputAdornment position="start">
            <Iconify icon="eva:search-fill" sx={{ color: 'text.disabled', width: 20, height: 20 }} />
          </InputAdornment>
        }
      />

      {/* <CustomDateRangePicker dateRangeState={dateRangeState} setDateRangeState={setDateRangeState} /> */}
    </RootStyle>
  );
}
