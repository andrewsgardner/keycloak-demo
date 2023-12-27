import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map, switchMap } from 'rxjs';
import { IUser } from '../models/user.interface';
import { DataService } from './data.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  public users$: Observable<IUser[]>;

  private searchTrigger$: BehaviorSubject<void> = new BehaviorSubject<void>(undefined);

  constructor(
    private dataService: DataService,
  ) {
    this.users$ = this.searchTrigger$.pipe(
      switchMap(() => this.dataService.getUsers()),
    );
  }

  public doSearch(): void {
    this.searchTrigger$.next();
  }

  public getUserByUsername$(username: string | undefined): Observable<IUser | undefined> {
    return this.users$.pipe(
      map((users: IUser[]) => users.find((x: IUser) => x.username === username)),
    );
  }
}
