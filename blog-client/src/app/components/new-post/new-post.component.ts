import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Observable, take } from 'rxjs';
import { IPostCreate } from 'src/app/models/post-create.interface';
import { IUser } from 'src/app/models/user.interface';
import { PostService } from 'src/app/services/post.service';
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
    private postService: PostService,
  ) {
    this.authUser$ = this.userService.authUser$;
  }

  public getInitials(user: IUser): string {
    if (user == null) {
      return '';
    }

    return `${user.first_name[0]?.toUpperCase()} ${user.last_name[0]?.toUpperCase()}`;
  }

  public createPost(username: string): void {
    if (!this.newPostValue.valid || !username || !this.newPostValue.value) {
      return;
    }

    const create: IPostCreate = {
      post_text: this.newPostValue.value,
      userid: username,
    };

    this.postService.createPost$(create).pipe(
      take(1),
    ).subscribe();
  }
}
