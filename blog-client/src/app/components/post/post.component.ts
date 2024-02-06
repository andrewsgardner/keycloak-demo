import { Component, Input } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { BehaviorSubject, Observable, combineLatest, filter, map, switchMap, take } from 'rxjs';
import { AuthRole } from 'src/app/enums/auth-role.enum';
import { IPostUpdate } from 'src/app/models/post-update.interface';
import { IPost } from 'src/app/models/post.interface';
import { IUser } from 'src/app/models/user.interface';
import { AuthService } from 'src/app/services/auth.service';
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
  public isAuthUser$: Observable<boolean>;
  public firstName: string | undefined = undefined;
  public lastName: string | undefined  = undefined;
  public editMode: boolean = false;
  public newPostValue: FormControl<string | null> = new FormControl<string | null>('', [Validators.required]);

  private postId$: BehaviorSubject<string | undefined> = new BehaviorSubject<string | undefined>(undefined);
  private authUser$: Observable<IUser>;

  constructor(
    private authService: AuthService,
    private userService: UserService,
    private postService: PostService,
  ) {
    this.post$ = this.postId$.asObservable().pipe(
      filter((postId: string | undefined): postId is string => !!postId),
      switchMap((postId: string) => this.postService.getPostById$(postId)),
    );

    this.authUser$ = this.userService.authUser$;

    this.user$ = this.post$.pipe(
      filter((post: IPost | undefined): post is IPost => !!post),
      switchMap((post: IPost) => this.userService.getUserByUsername$(post.userid)),
    );

    this.isAuthUser$ = combineLatest([
      this.authUser$,
      this.user$,
    ]).pipe(
      map(([authUser, user]: [IUser, IUser | undefined]) => {
        return authUser.username === user?.username
      }),
    );
  }

  public isAccessAllowed(isAuthUser: boolean | null | undefined): boolean {
    const administrator: boolean = this.authService.isUserInRole(AuthRole.Administrator);
    const contributor: boolean = this.authService.isUserInRole(AuthRole.Contributor);
    const observer: boolean = this.authService.isUserInRole(AuthRole.Contributor);

    if (administrator) {
      // Administrators can edit/delete posts created by any user.
      return true;
    } else if (isAuthUser && contributor) {
      // Contributors can only edit/delete posts they have created.
      return true;
    } else if (observer) {
      // Observers can't edit/delete posts.
      return false;
    } else {
      // Refuse access for everything else.
      return false;
    }
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

    this.postService.updatePost$(update).pipe(
      take(1),
    ).subscribe(() => {
      this.toggleEditMode(post_text);
    });
  }

  public deletePost(id: string | undefined): void {
    if (!id) {
      return;
    }

    this.postService.deletePost$(id).pipe(
      take(1),
    ).subscribe();
  }
}
