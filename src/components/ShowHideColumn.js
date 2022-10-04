import React, { useRef, memo, useState } from 'react';
import {
  Box,
  Button,
  InputAdornment,
  IconButton,
  Modal,
  SvgIcon,
  TextField,
  toggleButtonClasses,
  Typography,
} from '@mui/material';
import Add from '@mui/icons-material/Add';
import { useSnackbar } from 'notistack';

import { adminRoutes } from '../api/requests/index';

import Iconify from './Iconify';
// import IconButton from 'src/theme/overrides/IconButton';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
};

const ShowHideColumn = ({ toggle }) => {
  const { enqueueSnackbar } = useSnackbar();
  const moreRef = useRef();
  const [anchorEl, setAnchorEl] = useState();
  const [userDetails, setUserDetails] = useState({
    userName: null,
    fullName: null,
    password: null,
    fbAccessToken: {
      accessToken: null,
      accountId: null,
    },
  });

  const handleClose = () => {
    setAnchorEl(null);
    setUserDetails({
      userName: null,
      fullName: null,
      password: null,
      fbAccessToken: {
        accessToken: null,
        accountId: null,
      },
    });
  };
  const createNewUser = async () => {
    try {
      console.log('userDetails', userDetails);
      await adminRoutes.createNewClient(userDetails);
      toggle();
      enqueueSnackbar('User Successfully Created', {
        variant: 'success',
      });
    } catch (e) {
      enqueueSnackbar(e.response.data.error, {
        variant: 'error',
      });
    }
  };
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const [showPassword, setShowPassword] = useState(false);

  const open = !!anchorEl;
  const id = open ? 'simple-popover' : undefined;

  return (
    <>
      <Button
        ref={moreRef}
        variant="contained"
        color="secondary"
        onClick={handleClick}
        startIcon={
          <SvgIcon fontSize="small">
            <Add />
          </SvgIcon>
        }
      >
        Create New Client
      </Button>
      <Modal open={open} onClose={handleClose}>
        <Box style={{ ...style }} sx={{ width: 400, backgroundColor: 'whitesmoke', height: 530 }}>
          <Box sx={{ padding: '40px', display: 'flex', flexDirection: 'column' }}>
            <Typography variant="h4" sx={{ textAlign: 'center' }}>
              Create New User
            </Typography>
            <TextField
              sx={{ marginTop: '20px' }}
              onChange={(e) => {
                setUserDetails({ ...userDetails, fullName: e.target.value });
              }}
              value={userDetails.fullName}
              variant="standard"
              label="Full Name"
            />
            <TextField
              sx={{ marginTop: '20px' }}
              onChange={(e) => {
                setUserDetails({ ...userDetails, userName: e.target.value });
              }}
              value={userDetails.userName}
              variant="standard"
              label="User Name"
            />
            <TextField
              sx={{ marginTop: '20px' }}
              onChange={(e) => {
                setUserDetails({ ...userDetails, password: e.target.value });
              }}
              value={userDetails.password}
              variant="standard"
              label="Password"
              type={showPassword ? 'text' : 'password'}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                      <Iconify sx={{ width: '18px' }} icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <TextField
              sx={{ marginTop: '20px' }}
              onChange={(e) => {
                setUserDetails({
                  ...userDetails,
                  fbAccessToken: { accessToken: userDetails.fbAccessToken.accessToken, accountId: e.target.value },
                });
              }}
              value={userDetails.accountId}
              variant="standard"
              label="Business account Id"
            />
            <TextField
              sx={{ marginTop: '20px' }}
              onChange={(e) => {
                setUserDetails({
                  ...userDetails,
                  fbAccessToken: { accountId: userDetails.fbAccessToken.accountId, accessToken: e.target.value },
                });
              }}
              value={userDetails.fbAccessToken.accessToken}
              variant="standard"
              label="Facebook Access Token"
            />

            <Button
              variant="outlined"
              disabled={
                !userDetails.fullName ||
                !userDetails.userName ||
                !userDetails.password ||
                !userDetails.fbAccessToken.accessToken ||
                !userDetails.fbAccessToken.accountId
              }
              onClick={() => {
                createNewUser();
                handleClose();
              }}
              style={{ marginTop: '40px' }}
            >
              Create
            </Button>
          </Box>
        </Box>
      </Modal>
    </>
  );
};

export default memo(ShowHideColumn);
