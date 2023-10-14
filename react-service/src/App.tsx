import React from 'react';
import { ThemeProvider } from '@mui/material/styles';

import './App.scss';
import theme from './theme';

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      test...
    </ThemeProvider>
  );
}

export default App;
