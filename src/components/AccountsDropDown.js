import { useState } from 'react';
// material
import { Menu, Button, MenuItem, Typography } from '@mui/material';
// component
import Iconify from './Iconify';

const SORT_BY_OPTIONS = [
  { key: 'Account1', label: 'Account 1' },
  { key: 'Account2', label: 'Account 2' },
  { key: 'Account3', label: 'Account 3' },
];

export default function AccountsDropDown() {
  const [open, setOpen] = useState(null);
  const [selectedOption, setSelectedOption] = useState(SORT_BY_OPTIONS[0]);

  const onChange = (data) => {
    setSelectedOption(data);
  };

  const handleOpen = (event) => {
    setOpen(event.currentTarget);
  };

  const handleClose = () => {
    setOpen(null);
  };

  return (
    <>
      <Button
        sx={{ color: 'black' }}
        variant="outlined"
        disableRipple
        onClick={handleOpen}
        endIcon={<Iconify icon={open ? 'eva:chevron-up-fill' : 'eva:chevron-down-fill'} />}
      >
        <Typography component="span" variant="subtitle2" sx={{ color: '#000' }}>
          Select Add Account:&nbsp;
        </Typography>
        <Typography component="span" variant="subtitle2" sx={{ color: 'text.secondary' }}>
          {selectedOption.label}
        </Typography>
      </Button>
      <Menu
        keepMounted
        anchorEl={open}
        open={Boolean(open)}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        selected={selectedOption.key}
      >
        {SORT_BY_OPTIONS.map((option) => (
          <MenuItem
            key={option.key}
            selected={selectedOption.key === option.key}
            onClick={() => onChange(option)}
            sx={{ typography: 'body2' }}
          >
            {option.label}
          </MenuItem>
        ))}
      </Menu>
    </>
  );
}
