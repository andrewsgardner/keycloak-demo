import { Component } from '@angular/core';
import { KeycloakTokenParsed } from 'keycloak-js';
import { take } from 'rxjs';
import { IPost } from 'src/app/models/post.interface';
import { IUser } from 'src/app/models/user.interface';
import { AuthService } from 'src/app/services/auth.service';
import { DataService } from 'src/app/services/data.service';

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
    private dataService: DataService,
  ) {
    this.accessTokenParsed = this.authService.getAccessTokenParsed();
    this.idTokenParsed = this.authService.getIdTokenParsed();
    this.refreshTokenParsed = this.authService.getRefreshTokenParsed();

    // TODO: delete...
    this.dataService.getUsers().pipe(
      take(1),
    ).subscribe((res: IUser[]) => {
      console.log('users: ', res);
    });

    // TODO: delete...
    this.dataService.getPosts().pipe(
      take(1),
    ).subscribe((res: IPost[]) => {
      console.log('posts: ', res);
    });
  }
}
