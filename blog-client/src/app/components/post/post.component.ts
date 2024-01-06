import { Component, Input } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { BehaviorSubject, Observable, filter, switchMap, take } from 'rxjs';
import { IPostUpdate } from 'src/app/models/post-update.interface';
import { IPost } from 'src/app/models/post.interface';
import { IUser } from 'src/app/models/user.interface';
import { PostService } from 'src/app/services/post.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent {

  @Input()
  public set postId(value: string) {
    this.postId$.next(value);
  }
  
  public post$: Observable<IPost | undefined>;
  public user$: Observable<IUser | undefined>;
  public firstName: string | undefined = undefined;
  public lastName: string | undefined  = undefined;
  public editMode: boolean = false;
  public newPostValue: FormControl<string | null> = new FormControl<string | null>('', [Validators.required]);

  private postId$: BehaviorSubject<string | undefined> = new BehaviorSubject<string | undefined>(undefined);

  constructor(
    private userService: UserService,
    private postService: PostService,
  ) {
    this.post$ = this.postId$.asObservable().pipe(
      filter((postId: string | undefined): postId is string => !!postId),
      switchMap((postId: string) => this.postService.getPostById$(postId)),
    );

    this.user$ = this.post$.pipe(
      filter((post: IPost | undefined): post is IPost => !!post),
      switchMap((post: IPost) => this.userService.getUserByUsername$(post.userid)),
    );
  }

  public getInitials(user: IUser): string {
    if (user == null) {
      return '';
    }

    return `${user.first_name[0]?.toUpperCase()} ${user.last_name[0]?.toUpperCase()}`;
  }

  public toggleEditMode(post_text: string | undefined): void {
    if (post_text == null) {
      return;
    }

    this.editMode = !this.editMode;
    this.newPostValue.setValue(post_text);
  }

  public updatePost(id: string | undefined, post_text: string | undefined): void {
    if (!this.newPostValue.valid || !id || !this.newPostValue.value) {
      return;
    }

    const update: IPostUpdate = {
      id: id,
      post_text: this.newPostValue.value,
    };

    this.postService.updatePost(update).pipe(
      take(1),
    ).subscribe(() => {
      this.toggleEditMode(post_text);
    });
  }

  public deletePost(): void {
  }
}
