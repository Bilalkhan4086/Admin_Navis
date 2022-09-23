// snack bar
import { SnackbarProvider } from 'notistack';
import React,{useEffect} from 'react'
import {useNavigate} from "react-router-dom"
// routes
import Router from './routes';
// theme
import ThemeProvider from './theme';

// components
import ScrollToTop from './components/ScrollToTop';
import { BaseOptionChartStyle } from './components/chart/BaseOptionChart';

import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { adminRoutes } from './api/requests';
import LocalStorageWrapper from './LocalStroageWrapper';
import { INTERVAL_FOR_REFRESH_TOKEN } from './const';

// ----------------------------------------------------------------------

export default function App() {
const navigate = useNavigate();
const GetRefreshToken = async() =>{
console.log("Interval ran")
 try{ 
  const {data} = await adminRoutes.getRefresh();
  LocalStorageWrapper.setItem("jwtAccessToken",`Bearer ${data.token}`);
  LocalStorageWrapper.setItem("jwtRefreshToken",`Bearer ${data.refreshToken}`);
  return null;
}catch(err){
  navigate("/login");
}
}

  setInterval(GetRefreshToken,INTERVAL_FOR_REFRESH_TOKEN)

  return (
    <ThemeProvider>
      <SnackbarProvider maxSnack={3}>
        <ScrollToTop />
        <BaseOptionChartStyle />
        <Router />
      </SnackbarProvider>
    </ThemeProvider>
  );
}
