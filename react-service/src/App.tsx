import React from 'react';
import { ThemeProvider } from '@mui/material/styles';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import './App.scss';
import routes from './routes';
import theme from './theme';
import Toolbar from './components/Toolbar/Toolbar';

const router = createBrowserRouter(routes);

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <Toolbar />
      <main>
        <RouterProvider router={router} fallbackElement={<p>Initial Load...</p>} />
      </main>
    </ThemeProvider>
  );
}

export default App;
