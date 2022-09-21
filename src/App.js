// snack bar
import { SnackbarProvider } from 'notistack';
// routes
import Router from './routes';
// theme
import ThemeProvider from './theme';

// components
import ScrollToTop from './components/ScrollToTop';
import { BaseOptionChartStyle } from './components/chart/BaseOptionChart';

import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file

// ----------------------------------------------------------------------

export default function App() {
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
