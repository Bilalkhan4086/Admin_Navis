import { InputAdornment, Popover, SvgIcon, TextField } from '@mui/material';
import { useRef, useState } from 'react';
import { DateRangePicker } from 'react-date-range';
import DateRangeIcon from '@mui/icons-material/DateRange';

const CustomDateRangePicker = ({ dateRangeState, setDateRangeState }) => {
  const moreRef = useRef();
  const [anchorEl, setAnchorEl] = useState();

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const open = !!anchorEl;

  const handleSelect = (ranges) => {
    console.log(ranges.selection.endDate);
    setDateRangeState({
      startDate: ranges.selection.startDate,
      endDate: ranges.selection.endDate,
    });
    // {
    //   selection: {
    //     startDate: [native Date Object],
    //     endDate: [native Date Object],
    //   }
    // }
  };

  const selectionRange = {
    startDate: dateRangeState.startDate,
    endDate: dateRangeState.endDate,
    key: 'selection',
  };

  return (
    <>
      <TextField
        onClick={handleClick}
        ref={moreRef}
        value={`${new Date(dateRangeState.startDate).toLocaleDateString()} ~ ${new Date(
          dateRangeState.endDate
        ).toLocaleDateString()}`}
        placeholder="Date Range"
        label="Date Range"
        size="small"
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <SvgIcon fontSize="small" color="action">
                <DateRangeIcon />
              </SvgIcon>
            </InputAdornment>
          ),
        }}
      />
      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'center',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
      >
        <DateRangePicker ranges={[selectionRange]} onChange={handleSelect} />
      </Popover>
    </>
  );
};

export default CustomDateRangePicker;
