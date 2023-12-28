import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { take } from 'rxjs';
import { IPostUpdate } from 'src/app/models/post-update.interface';
import { IPost } from 'src/app/models/post.interface';
import { IUser } from 'src/app/models/user.interface';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {

  @Input()
  public post: IPost | undefined = undefined;

  @Output()
  public update: EventEmitter<IPostUpdate> = new EventEmitter<IPostUpdate>();

  public firstName: string | undefined = undefined;
  public lastName: string | undefined  = undefined;
  public editMode: boolean = false;
  public newPostValue: FormControl<string | null> = new FormControl<string | null>('', [Validators.required]);

  constructor(
    private userService: UserService,
  ) {
  }

  ngOnInit(): void {
    this.userService.getUserByUsername$(this.post?.userid).pipe(
      take(1),
    ).subscribe((res: IUser | undefined) => {
      if (res == null) {
        return;
      }
      
      this.firstName = res.first_name;
      this.lastName = res.last_name;
    });
  }

  public getInitials(): string {
    if (!this.firstName || !this.lastName) {
      return '';
    }

    return `${this.firstName[0]?.toUpperCase()} ${this.lastName[0]?.toUpperCase()}`;
  }

  public toggleEditMode(): void {
    this.editMode = !this.editMode;
    this.newPostValue.setValue(this.post?.post_text ? this.post?.post_text : '');
  }

  public updatePost(): void {
    if (!this.newPostValue.valid || !this.post?.id || !this.newPostValue.value) {
      return;
    }

    this.update.emit({
      id: this.post.id,
      post_text: this.newPostValue.value,
    });
    
    this.post.post_text = this.newPostValue.value;
    this.toggleEditMode();
  }

  public deletePost(): void {
  }
}
