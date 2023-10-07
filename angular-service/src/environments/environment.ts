import { KeycloakConfig } from "keycloak-js";

const keycloakConfig: KeycloakConfig = {
    url: 'http://localhost:8080/',
    realm: 'demo',
    clientId: 'angular-client'
  };

export const environment = {
    production: true,
    keycloak: keycloakConfig,
};
