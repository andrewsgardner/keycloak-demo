import { Injectable } from '@angular/core';
import { KeycloakOptions } from 'keycloak-angular';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  constructor() { }

  public getKeycloakInit(): KeycloakOptions {
    return {
        config: {
          url: (window as any)['env']['kcUrl'],
          realm: 'demo',
          clientId: 'blog-client'
        },
        initOptions: {
          onLoad: 'login-required'
        }
    }
}
}
