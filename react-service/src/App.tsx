import React from 'react';
import Keycloak, { KeycloakInitOptions } from 'keycloak-js'
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { ReactKeycloakProvider } from '@react-keycloak/web';
import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';

import './App.scss';
import theme from './providers/theme';
import routes from './routes';
import Toolbar from './components/Toolbar/Toolbar';

const router = createBrowserRouter(routes);

const App = () => {

  const keycloak = new Keycloak({
    url: 'http://localhost:8080/',
    realm: 'demo',
    clientId: 'react-client',
  });

  const keycloakProviderInitConfig: KeycloakInitOptions = {
    onLoad: 'login-required',
  }

  return (
    <ReactKeycloakProvider 
      authClient={keycloak}
      initOptions={keycloakProviderInitConfig}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Toolbar />
          <main>
            <RouterProvider router={router} fallbackElement={<CircularProgress />} />
          </main>
      </ThemeProvider>
    </ReactKeycloakProvider>
  );
}

export default App;
