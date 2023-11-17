import { Component } from '@angular/core';
import { KeycloakTokenParsed } from 'keycloak-js';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {

  public accessTokenParsed: KeycloakTokenParsed | undefined = undefined;
  public idTokenParsed: KeycloakTokenParsed | undefined = undefined;
  public refreshTokenParsed: KeycloakTokenParsed | undefined = undefined;

  constructor(
    private authService: AuthService,
  ) {
    this.accessTokenParsed = this.authService.getAccessTokenParsed();
    this.idTokenParsed = this.authService.getIdTokenParsed();
    this.refreshTokenParsed = this.authService.getRefreshTokenParsed();
  }
}
