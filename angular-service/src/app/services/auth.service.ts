import { Injectable } from '@angular/core';
import { KeycloakService } from 'keycloak-angular';
import { KeycloakProfile, KeycloakTokenParsed } from 'keycloak-js';
import { Observable, asapScheduler, scheduled } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private keycloakService: KeycloakService,
  ) { }

  public logout(): Promise<void> {
    return this.keycloakService.logout();
  }
  
  public userProfile(): Observable<KeycloakProfile> {
    return scheduled(this.keycloakService.loadUserProfile(), asapScheduler);
  }

  public getRoles(): string[] {
    return this.keycloakService.getUserRoles();
  }

  public getToken(): Observable<string> {
    return scheduled(this.keycloakService.getToken(), asapScheduler);
  }

  public getParsedToken(): KeycloakTokenParsed | undefined {
    return this.keycloakService.getKeycloakInstance().tokenParsed;
  }
}
