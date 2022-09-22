import * as Yup from 'yup';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {useSnackbar} from "notistack";


// form
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import { Link, Stack, IconButton, InputAdornment,Typography } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { adminRoutes } from '../../../api/requests/index';

// components
import Iconify from '../../../components/Iconify';
import { FormProvider, RHFTextField, RHFCheckbox } from '../../../components/hook-form';
import LocalStorageWrapper from '../../../LocalStroageWrapper';
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
    const {data} = await adminRoutes.login({
      userName:getValues().userName,
      password:getValues().password
    })
     if(data.success && data.role === "admin"){
      LocalStorageWrapper.setItem("token",`Bearer ${data.token}`)
      navigate('/dashboard/clients', { replace: true });
      enqueueSnackbar('Successfully logged In', {
        variant: 'success',
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
