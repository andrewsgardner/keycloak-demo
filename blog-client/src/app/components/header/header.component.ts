import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { AuthRole } from 'src/app/enums/auth-role.enum';
import { IUser } from 'src/app/models/user.interface';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  public authUser$: Observable<IUser>;
  public roles: string[] = [];

  constructor(
    private userService: UserService,
    private authService: AuthService,
  ) {
    this.authUser$ = this.userService.authUser$;
    this.roles = this.authService.getRoles();
  }

  public logout(): void {
    this.authService.logout();
  }

  public authRoles(): string[] {
    return this.roles.filter((x: string) => (Object.values(AuthRole) as string[]).includes(x));
  }
}
