import { Component } from '@angular/core';
import { KeycloakTokenParsed } from 'keycloak-js';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-token-vis',
  templateUrl: './token-vis.component.html',
  styleUrls: ['./token-vis.component.scss']
})
export class TokenVisComponent {

  public token$: Observable<string>;
  public parsedToken: KeycloakTokenParsed | undefined = undefined;
  
  constructor(
    private authService: AuthService,
  ) {
    this.parsedToken = this.authService.getParsedToken();
    this.token$ = this.authService.getToken();
  }
}
