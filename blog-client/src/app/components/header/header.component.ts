import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { KeycloakProfile } from 'keycloak-js';
import { AuthService } from 'src/app/services/auth.service';
import { AuthRole } from 'src/app/enums/auth-role.enum';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  public userProfile$: Observable<KeycloakProfile>;
  public roles: string[] = [];

  constructor(
    private authService: AuthService,
  ) {
    this.userProfile$ = this.authService.userProfile();
    this.roles = this.authService.getRoles();
  }

  public logout(): void {
    this.authService.logout();
  }

  public authRoles(): string[] {
    return this.roles.filter((x: string) => (Object.values(AuthRole) as string[]).includes(x));
  }
}
