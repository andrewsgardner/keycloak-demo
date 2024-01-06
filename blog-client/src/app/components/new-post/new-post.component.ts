import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { IUser } from 'src/app/models/user.interface';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-new-post',
  templateUrl: './new-post.component.html',
  styleUrls: ['./new-post.component.scss']
})
export class NewPostComponent {

  public authUser$: Observable<IUser>;
  public newPostValue: FormControl<string | null> = new FormControl<string | null>('', [Validators.required]);

  constructor(
    private userService: UserService,
  ) {
    this.authUser$ = this.userService.authUser$;
  }

  public getInitials(user: IUser): string {
    if (user == null) {
      return '';
    }

    return `${user.first_name[0]?.toUpperCase()} ${user.last_name[0]?.toUpperCase()}`;
  }

  public submitPost(): void {
  }
}
