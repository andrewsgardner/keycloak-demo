import React from 'react';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';

import './App.scss';
import routes from './routes';
import theme from './theme';
import Toolbar from './components/Toolbar/Toolbar';

const router = createBrowserRouter(routes);

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Toolbar />
      <main>
        <RouterProvider router={router} fallbackElement={<CircularProgress />} />
      </main>
    </ThemeProvider>
  );
}

export default App;
