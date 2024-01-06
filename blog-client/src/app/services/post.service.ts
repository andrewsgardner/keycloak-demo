import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject, map, mergeMap, scan, shareReplay, switchMap, tap } from 'rxjs';
import { IPost } from '../models/post.interface';
import { ISearchParams } from '../models/search-params.interface';
import { DataService } from './data.service';
import { IPostUpdate } from '../models/post-update.interface';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  public isLoading$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);
  private postsData$: BehaviorSubject<IPost[]> = new BehaviorSubject<IPost[]>([]);
  private postsDataObs$: Observable<IPost[]> = this.postsData$.asObservable();

  private searchTrigger$: Subject<void> = new Subject<void>();
  private pageLimitOpts: number[] = [5, 10, 25, 100];
  private readonly DEFAULT_SEARCH_PARAMS: ISearchParams = {
    page: 1,
    skip: 0,
    limit: this.pageLimitOpts[1],
  };
  private searchParams$: BehaviorSubject<ISearchParams> = new BehaviorSubject<ISearchParams>(this.DEFAULT_SEARCH_PARAMS);

  constructor(
    private dataService: DataService,
  ) {
    const batch$ = this.searchTrigger$.pipe(
      switchMap(() => {
        this.isLoading$.next(true);
        return this.dataService.getPosts(this.searchParams$.getValue());
      }),
    );
    
    this.postsDataObs$ = batch$.pipe(
      mergeMap((res: IPost[]) => res),
      scan((acc: IPost[], curr: IPost) => {
        if (!acc.some((x: IPost) => curr.id === x.id)) {
          acc.push(curr);
        }
        
        return acc.sort((a: IPost, b: IPost) => Date.parse(b.update_date) - Date.parse(a.update_date));
      }, []),
      tap(() => this.isLoading$.next(false)),
      shareReplay(),
    );
  }

  public get posts(): Observable<IPost[]> {
    return this.postsDataObs$;
  }

  public set posts(posts: IPost[]) {
    this.postsData$.next(posts);
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

  public updatePost(update: IPostUpdate): Observable<void> {
    return this.posts.pipe(
      switchMap((posts: IPost[]) => this.dataService.patchPost(update.id, update.post_text).pipe(
        map((res: IPost) => {
          const newPosts: IPost[] = posts;

          for (const p of newPosts) {
            if (p.id === update.id) {
              p.post_text = update.post_text;
            }
          }

          this.posts = newPosts;
          console.log('[PostService]: Updated post: ', res);
        }),
      )),
    );
  }

  public getPostById$(id: string): Observable<IPost | undefined> {
    return this.posts.pipe(
      map((posts: IPost[]) => posts.find((p: IPost) => p.id === id)),
    );
  }
}
