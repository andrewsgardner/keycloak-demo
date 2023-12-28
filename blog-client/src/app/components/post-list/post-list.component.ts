import { AfterViewInit, Component } from '@angular/core';
import { BehaviorSubject, Observable, Subject, mergeMap, scan, switchMap, tap } from 'rxjs';
import { IPost } from 'src/app/models/post.interface';
import { ISearchParams } from 'src/app/models/search-params.interface';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss']
})
export class PostListComponent implements AfterViewInit {

  public isLoading$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);
  public posts$: Observable<IPost[]>;

  private searchTrigger$: Subject<void> = new Subject<void>();
  private pageLimitOpts: number[] = [5, 10, 25, 100];
  private searchParams$: BehaviorSubject<ISearchParams> = new BehaviorSubject<ISearchParams>({
    page: 1,
    skip: 0,
    limit: this.pageLimitOpts[1],
  });

  constructor(
    private dataService: DataService,
  ) {
    const batch$ = this.searchTrigger$.pipe(
      switchMap(() => {
        this.isLoading$.next(true);
        return this.dataService.getPosts(this.searchParams$.getValue());
      }),
    );

    this.posts$ = batch$.pipe(
      mergeMap((res: IPost[]) => res),
      scan((acc: IPost[], curr: IPost) => {
        if (!acc.some((x: IPost) => curr.id === x.id)) {
          acc.push(curr);
        }
        
        return acc;
      }, []),
      tap(() => this.isLoading$.next(false)),
    );
  }

  ngAfterViewInit(): void {
    this.doSearch();
  }

  public doSearch(): void {
    this.searchTrigger$.next();
  }

  public loadMore(): void {
    const params: ISearchParams = this.searchParams$.getValue();
    const offset: number = params.page * params.limit;

    params.skip = offset;
    params.page = params.page + 1;
    this.searchParams$.next(params);
    this.doSearch();
  }
}
