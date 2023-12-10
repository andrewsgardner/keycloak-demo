import { Injectable } from '@angular/core';
import { KeycloakOptions } from 'keycloak-angular';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  constructor() { }

  public getKeycloakInit(): KeycloakOptions {
    return {
        config: environment.keycloak,
        initOptions: {
          onLoad: 'login-required'
        }
    }
}
}
