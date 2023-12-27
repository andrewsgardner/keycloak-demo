import { Component, Input, OnInit } from '@angular/core';
import { Observable, take } from 'rxjs';
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

  public firstName: string = '';
  public lastName: string  = '';

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
    return `${this.firstName[0]?.toUpperCase()} ${this.lastName[0]?.toUpperCase()}`;
  }
}
