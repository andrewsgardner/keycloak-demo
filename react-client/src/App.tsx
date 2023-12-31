import React, { useEffect, useMemo, useReducer } from 'react';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { useAuth } from "react-oidc-context";
import { ThemeProvider } from '@mui/material/styles';
import CircularProgress from '@mui/material/CircularProgress';
import { CssBaseline, createTheme } from '@mui/material';

import './App.scss';
import { lightTheme } from './themes/light';
import { darkTheme } from './themes/dark';
import routes from './routes';
import Toolbar from './components/Toolbar/Toolbar';
import { IReducerAction, IReducerState, ReducerActionKind } from './interfaces/reducer-state.interface';
import { AppContext } from './contexts/AppContext';

const initialState: IReducerState = {
  colorMode: 'light',
  profile: undefined,
  accessTokenParsed: undefined,
  idTokenParsed: undefined,
  refreshTokenParsed: undefined,
  roles: [],
};

const reducer = (state: IReducerState, action: IReducerAction) => {
  switch (action.type) {
    case ReducerActionKind.UPDATE_COLOR_MODE:
      return {
        ...state,
        colorMode: action.payload,
      };
    case ReducerActionKind.UPDATE_PROFILE:
      return {
        ...state,
        profile: action.payload,
      };
    case ReducerActionKind.UPDATE_ACCESS_TOKEN_PARSED:
      return {
        ...state,
        accessTokenParsed: action.payload,
      };
    case ReducerActionKind.UPDATE_ID_TOKEN_PARSED:
      return {
        ...state,
        idTokenParsed: action.payload,
      };
    case ReducerActionKind.UPDATE_REFRESH_TOKEN_PARSED:
      return {
        ...state,
        refreshTokenParsed: action.payload,
      };
    case ReducerActionKind.UPDATE_ROLES:
      return {
        ...state,
        roles: action.payload,
      };
    default:
      throw new Error(`[reducer] Unknown operation! state: ${state} action: ${action}`);
  }
};

const App = () => {
  const auth = useAuth();
  const [hasTriedSignin, setHasTriedSignin] = React.useState(false);
  const [state, dispatch] = useReducer(reducer, initialState);
  const contextValue = useMemo(() => ({ state, dispatch }), [state, dispatch]);
  const theme = useMemo(() => createTheme(state.colorMode === 'light' ? lightTheme : darkTheme), [state.colorMode]);
  const router = createBrowserRouter(routes);

  useEffect(() => {
    if (!auth.isAuthenticated && !auth.activeNavigator && !auth.isLoading && !hasTriedSignin) {
      auth.signinRedirect();
      setHasTriedSignin(true);
    }
  }, [auth]);

  useEffect(() => {
    dispatch({
      type: ReducerActionKind.UPDATE_PROFILE,
      payload: auth?.user?.profile,
    });

    const accessTokenParsed = parseJwt(auth?.user?.access_token);

    dispatch({
      type: ReducerActionKind.UPDATE_ACCESS_TOKEN_PARSED,
      payload: accessTokenParsed,
    });

    const roles: string[] = accessTokenParsed?.realm_access?.roles;
    
    dispatch({
      type: ReducerActionKind.UPDATE_ROLES,
      payload: roles,
    });

    dispatch({
      type: ReducerActionKind.UPDATE_ID_TOKEN_PARSED,
      payload: parseJwt(auth?.user?.id_token),
    });
    
    dispatch({
      type: ReducerActionKind.UPDATE_REFRESH_TOKEN_PARSED,
      payload: parseJwt(auth?.user?.refresh_token),
    });
  }, [auth?.user]);

  const parseJwt = (token: string | undefined) => {
    if (!token) {
      return '';
    }
    
    const base64Url: string = token.split('.')[1];
    const base64: string = base64Url.replace('-', '+').replace('_', '/');

    return JSON.parse(window.atob(base64));
  };

  if (auth.isLoading) {
    return (
    <div className="loading">
      <CircularProgress size="75px" />
    </div>
    );
  }

  if (!auth.isAuthenticated) {
    return null;
  }

  return (
    <AppContext.Provider value={contextValue}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Toolbar />
            <main>
              <RouterProvider router={router} fallbackElement={<CircularProgress />} />
            </main>
        </ThemeProvider>
      </AppContext.Provider>
  );
}

export default App;
