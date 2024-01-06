import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, combineLatest, map, switchMap } from 'rxjs';
import { IUser } from '../models/user.interface';
import { DataService } from './data.service';
import { AuthService } from './auth.service';
import { KeycloakProfile } from 'keycloak-js';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  public users$: Observable<IUser[]>;
  public authUser$: Observable<IUser>;

  private searchTrigger$: BehaviorSubject<void> = new BehaviorSubject<void>(undefined);

  constructor(
    private authService: AuthService,
    private dataService: DataService,
  ) {
    this.users$ = this.searchTrigger$.pipe(
      switchMap(() => this.dataService.getUsers()),
    );
    
    this.authUser$ = combineLatest([
      this.authService.userProfile(),
      this.users$
    ]).pipe(
      map(([keycloakProfile, users]: [KeycloakProfile, IUser[]]) => {
        const authUser: IUser | undefined = users.find((x: IUser) => x.username === keycloakProfile.username);

        if (authUser == null) {
          throw new Error(`[UserService]: Could not match keycloak username '${keycloakProfile.username}' to any user profiles.`);
        }

        return authUser;
      }),
    );
  }

  public doSearch(): void {
    this.searchTrigger$.next();
  }

  public getUserByUsername$(username: string): Observable<IUser | undefined> {
    return this.users$.pipe(
      map((users: IUser[]) => users.find((x: IUser) => x.username === username)),
    );
  }
}
