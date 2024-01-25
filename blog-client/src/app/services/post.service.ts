import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject, filter, map, mergeMap, of, scan, shareReplay, switchMap, tap } from 'rxjs';
import { IPost } from '../models/post.interface';
import { ISearchParams } from '../models/search-params.interface';
import { DataService } from './data.service';
import { IPostUpdate } from '../models/post-update.interface';
import { IPostCreate } from '../models/post-create.interface';
import { IPaginatedResponse } from '../models/paginated-response.interface';
import { IPagination } from '../models/pagination.interface';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  public isLoading$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);
  private postsData$: BehaviorSubject<IPost[]> = new BehaviorSubject<IPost[]>([]);
  private postsDataObs$: Observable<IPost[]> = this.postsData$.asObservable();
  private paginatedResponse$: Observable<IPaginatedResponse<IPost>>;
  private pagination$: Observable<IPagination>;

  private searchTrigger$: Subject<void> = new Subject<void>();
  private readonly DEFAULT_SEARCH_PARAMS: ISearchParams = {
    page: 1,
    limit: 10,
    offset: 0,
  };
  private searchParams$: BehaviorSubject<ISearchParams> = new BehaviorSubject<ISearchParams>(this.DEFAULT_SEARCH_PARAMS);

  constructor(
    private dataService: DataService,
  ) {
    this.paginatedResponse$ = this.searchTrigger$.pipe(
      switchMap(() => {
        this.isLoading$.next(true);
        return this.dataService.getPosts(this.searchParams$.getValue());
      }),
    );

    this.pagination$ = this.paginatedResponse$.pipe(
      map((response: IPaginatedResponse<IPost>) => {
        const totalPages: number = Math.ceil(response.total/response.limit);
        const perPage: number = response.limit;
        const currentPage: number = this.searchParams$.getValue().page;
        
        return {
          totalPages: totalPages,
          total: response.total,
          perPage: perPage,
          currentPage: this.searchParams$.getValue().page,
          from: ((currentPage -1) * totalPages) + 1,
          to: totalPages === currentPage ? (perPage * (currentPage - 1)) + response.items.length : perPage * currentPage,
        }
      }),
      shareReplay(),
    );
    
    this.postsDataObs$ = this.paginatedResponse$.pipe(
      map((x: IPaginatedResponse<IPost>) => x.items),
      mergeMap((res: IPost[]) => res),
      scan((acc: IPost[], curr: IPost) => {
        if (!acc.some((x: IPost) => curr.id === x.id)) {
          acc.push(curr);
        }
        
        return acc.sort((a: IPost, b: IPost) => Date.parse(a.create_date) - Date.parse(b.create_date));
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

  public getPagination$(): Observable<IPagination> {
    return this.pagination$;
  }

  public loadMore(): void {
    const params: ISearchParams = this.searchParams$.getValue();
    const offset: number = params.page * params.limit;

    params.offset = offset;
    params.page = params.page + 1;
    this.searchParams$.next(params);
    this.doSearch();
  }

  public createPost$(create: IPostCreate): Observable<void> {
    return this.posts.pipe(
      switchMap((posts) => this.dataService.createPost(create).pipe(
        map((res: IPost) => {
          const newPosts: IPost[] = posts;

          try {
            const post: IPost = res;
            newPosts.push(post);
          } catch {
            throw new Error(`[PostService]: Could not create local copy of post id '${res.id}'!`);
          }
          
          this.posts = newPosts;
          console.log('[PostService]: Created post: ', res);
        }),
      )),
    );
  }

  public updatePost$(update: IPostUpdate): Observable<void> {
    return this.posts.pipe(
      switchMap((posts: IPost[]) => this.dataService.patchPost(update.id, update.post_text).pipe(
        map((res: IPost) => {
          const newPosts: IPost[] = posts;
          const index: number = newPosts.findIndex((x: IPost) => x.id === update.id);

          try {
            const post: IPost = newPosts[index];
            post.post_text = update.post_text;
          } catch {
            throw new Error(`[PostService]: Could not update local copy of post id '${update.id}'!`);
          }
          
          this.posts = newPosts;
          console.log('[PostService]: Updated post: ', res);
        }),
      )),
    );
  }
  
  public deletePost$(id: string | undefined): Observable<void> {
    return this.posts.pipe(
      switchMap((posts: IPost[]) => of(id).pipe(
        filter((id: string | undefined): id is string => !!id),
        switchMap((id: string) => this.dataService.deletePost(id)),
        map((res: IPost) => {
          const newPosts: IPost[] = posts;
          const index: number = newPosts.findIndex((x: IPost) => x.id === id);
          
          try {
            newPosts.splice(index, 1);
          } catch {
            throw new Error(`[PostService]: Could not delete local copy of post id '${id}'!`);
          }
          
          this.posts = newPosts;
          console.log('[PostService]: Deleted post: ', res);
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
