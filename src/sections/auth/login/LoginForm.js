import * as Yup from 'yup';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import {useSnackbar} from "notistack";

// form
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import { Link, Stack, IconButton, InputAdornment,Typography } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// components
import Iconify from '../../../components/Iconify';
import { FormProvider, RHFTextField, RHFCheckbox } from '../../../components/hook-form';
// ----------------------------------------------------------------------

export default function LoginForm() {
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const [showPassword, setShowPassword] = useState(false);

  const LoginSchema = Yup.object().shape({
    userName: Yup.string().required('UserName is required'),
    password: Yup.string().required('Password is required').min(6,"Password cannot be less than 6 digits"),
  });

  const defaultValues = {
    userName: '',
    password: '',
    remember: true,
  };

  const methods = useForm({
    resolver: yupResolver(LoginSchema),
    defaultValues,
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
    getValues
  } = methods;

  const onSubmit = async () => {
    try {
    const {data} = await axios.post("http://localhost:5000/admin/login",{
      userName:getValues().userName,
      password:getValues().password
    })
     if(data.success && data.role === "admin"){
      navigate('/dashboard/user', { replace: true });
      enqueueSnackbar('Successfully logged In', {
        variant: 'success',
      });
    }
     else if(data.success && data.role === "client"){
      enqueueSnackbar('Cannot access route with client role', {
        variant: 'warning',
      });
     }
    }
    catch(e){
      enqueueSnackbar(e.response.data.error, {
        variant: 'error',
      });
    }
     };

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={3}>
        <RHFTextField name="userName"  label="User Name" />

        <RHFTextField
          name="password"
          label="Password"
          type={showPassword ? 'text' : 'password'}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                  <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </Stack>
      <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ my: 2 }}>
        <RHFCheckbox name="remember" label="Remember me" />
        <Link variant="subtitle2" underline="hover">
          Forgot password?
        </Link>
      </Stack>

      <LoadingButton fullWidth size="large" type="submit" variant="contained" loading={isSubmitting}>
        Login
      </LoadingButton>
    </FormProvider>
  );
}
