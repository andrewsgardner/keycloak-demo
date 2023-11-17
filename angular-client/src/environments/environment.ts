import { KeycloakConfig } from "keycloak-js";

const keycloakConfig: KeycloakConfig = {
    url: (window as any)['env']['kcUrl'],
    realm: 'demo',
    clientId: 'angular-client'
  };

export const environment = {
    production: true,
    keycloak: keycloakConfig,
};
