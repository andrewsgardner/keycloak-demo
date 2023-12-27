import { Component } from '@angular/core';
import { Observable, take } from 'rxjs';
import { IPost } from 'src/app/models/post.interface';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss']
})
export class PostListComponent {

  public posts$: Observable<IPost[]>;

  constructor(
    private dataService: DataService,
  ) {
    // TODO: delete...
    /*
    this.userService.users$.pipe(
      take(1),
    ).subscribe((res: IUser[]) => {
      console.log('users: ', res);
    });
    */
    this.posts$ = this.dataService.getPosts();
  }

}
