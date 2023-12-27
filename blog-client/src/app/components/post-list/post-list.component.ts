import { Component } from '@angular/core';
import { Observable } from 'rxjs';
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
    this.posts$ = this.dataService.getPosts();
  }

}
