import { AfterViewInit, Component } from '@angular/core';
import { Observable } from 'rxjs';
import { IPost } from 'src/app/models/post.interface';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss']
})
export class PostListComponent implements AfterViewInit {

  public isLoading$: Observable<boolean>;
  public posts$: Observable<IPost[]>;

  constructor(
    private postService: PostService,
  ) {
    this.isLoading$ = this.postService.isLoading$;
    this.posts$ = this.postService.posts;
  }

  ngAfterViewInit(): void {
    this.postService.doSearch();
  }

  public loadMore(): void {
    this.postService.loadMore();
  }
}
