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
import { UsersAPI } from './apis/UsersAPI';
import { api } from './apis/axios-config';
import { ProjectsAPI } from './apis/ProjectsAPI';
import { IUser } from './interfaces/user.interface';
import { IProject } from './interfaces/project.interface';
import { IssuesAPI } from './apis/IssuesAPI';
import { IIssue } from './interfaces/issue.interface';

const initialState: IReducerState = {
  colorMode: 'light',
  profile: undefined,
  accessToken: undefined,
  accessTokenParsed: undefined,
  idTokenParsed: undefined,
  refreshTokenParsed: undefined,
  roles: [],
  users: [],
  projects: [],
  issues: [],
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
    case ReducerActionKind.UPDATE_ACCESS_TOKEN:
      return {
        ...state,
        accessToken: action.payload,
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
    case ReducerActionKind.UPDATE_USERS:
      return {
        ...state,
        users: action.payload,
      };
    case ReducerActionKind.UPDATE_PROJECTS:
      return {
        ...state,
        projects: action.payload,
      };
    case ReducerActionKind.UPDATE_ISSUES:
      return {
        ...state,
        issues: action.payload,
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

    const accessToken = auth?.user?.access_token;
    const accessTokenParsed = parseJwt(accessToken);
    const roles: string[] = accessTokenParsed?.realm_access?.roles;

    dispatch({
      type: ReducerActionKind.UPDATE_ACCESS_TOKEN,
      payload: accessToken,
    });

    dispatch({
      type: ReducerActionKind.UPDATE_ACCESS_TOKEN_PARSED,
      payload: accessTokenParsed,
    });
    
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
  
  useEffect(() => {
    if (!state.accessToken) {
      return;
    }

    // Add access token to axios request headers
    api.defaults.headers.common['Authorization'] = `Bearer ${state.accessToken}`;

    // Set users into state
    UsersAPI.getUsers().then((res: IUser[]) => {
      dispatch({
        type: ReducerActionKind.UPDATE_USERS,
        payload: res,
      });
    });

    // Set projects into state
    ProjectsAPI.getProjects().then((res: IProject[]) => {
      dispatch({
        type: ReducerActionKind.UPDATE_PROJECTS,
        payload: res,
      });
    });

    // Set issues into state
    IssuesAPI.getIssues().then((res: IIssue[]) => {
      dispatch({
        type: ReducerActionKind.UPDATE_ISSUES,
        payload: res,
      });
    });
  }, [state.accessToken]);

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
