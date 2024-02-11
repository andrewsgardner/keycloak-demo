import React from 'react';
import ReactDOM from 'react-dom/client';

import './index.scss';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { AuthProvider, AuthProviderProps } from 'react-oidc-context';
import { KeycloakConfig } from 'keycloak-js';

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
const keycloakConfig: KeycloakConfig = {
    url: process.env.REACT_APP_KC_URL || 'http://localhost:8080',
    realm: 'demo',
    clientId: 'issue-tracker-client',
};
const oidcConfig: AuthProviderProps = {
    authority: `${keycloakConfig.url}/realms/${keycloakConfig.realm}`,
    client_id: keycloakConfig.clientId,
    redirect_uri: process.env.REACT_APP_CLIENT_URL || 'http://localhost:3000',
    post_logout_redirect_uri: process.env.REACT_APP_CLIENT_URL || 'http://localhost:3000',
    revokeTokensOnSignout: true,
};

const onSigninCallback = (): void => {
    window.history.replaceState(
        {},
        document.title,
        window.location.pathname
    );
};

root.render(
    <AuthProvider {...oidcConfig} onSigninCallback={onSigninCallback}>
        <App />
    </AuthProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
