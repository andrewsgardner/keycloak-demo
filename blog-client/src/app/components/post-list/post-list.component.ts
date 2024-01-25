import { AfterViewInit, Component } from '@angular/core';
import { Observable } from 'rxjs';
import { IPagination } from 'src/app/models/pagination.interface';
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
  public pagination$: Observable<IPagination>;

  constructor(
    private postService: PostService,
  ) {
    this.isLoading$ = this.postService.isLoading$;
    this.posts$ = this.postService.posts;
    this.pagination$ = this.postService.getPagination$();
  }

  ngAfterViewInit(): void {
    this.postService.doSearch();
  }

  public loadMore(): void {
    this.postService.loadMore();
  }

  public showPagination(pagination: IPagination | null | undefined): boolean {
    if (!pagination) {
      return false;
    }
    
    return pagination.currentPage < pagination.totalPages;
  }
}
