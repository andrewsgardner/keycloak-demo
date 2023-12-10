import { KeycloakOptions, KeycloakService } from "keycloak-angular";
import { ConfigService } from "../services/config.service";

export const initializeKeycloak = (keycloak: KeycloakService, config: ConfigService) => {
    const opts: KeycloakOptions = config.getKeycloakInit();

    return () => keycloak.init(opts).then((isAuth: boolean) => {
        console.log(`Keycloak Init: ${isAuth}`);
    }).catch((err) => {
        console.error('Failed to initialize Keycloak: ', err);
    });
};