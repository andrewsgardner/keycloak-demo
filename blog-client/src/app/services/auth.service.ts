import { Injectable } from '@angular/core';
import { KeycloakService } from 'keycloak-angular';
import { KeycloakProfile, KeycloakTokenParsed } from 'keycloak-js';
import { Observable, asapScheduler, scheduled } from 'rxjs';
import { AuthRole } from '../enums/auth-role.enum';

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

  public getAccessToken(): string | undefined {
    return this.keycloakService.getKeycloakInstance().token;
  }

  public getAccessTokenParsed(): KeycloakTokenParsed | undefined {
    return this.keycloakService.getKeycloakInstance().tokenParsed;
  }

  public getIdToken(): string | undefined {
    return this.keycloakService.getKeycloakInstance().idToken;
  }

  public getIdTokenParsed(): KeycloakTokenParsed | undefined {
    return this.keycloakService.getKeycloakInstance().idTokenParsed;
  }

  public getRefreshToken(): string | undefined {
    return this.keycloakService.getKeycloakInstance().refreshToken;
  }

  public getRefreshTokenParsed(): KeycloakTokenParsed | undefined {
    return this.keycloakService.getKeycloakInstance().refreshTokenParsed;
  }

  public getToken(): Observable<string> {
    return scheduled(this.keycloakService.getToken(), asapScheduler);
  }

  public isUserInRole(role: AuthRole): boolean {
    return this.keycloakService.isUserInRole(role);
  }
}
