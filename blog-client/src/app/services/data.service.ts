import { Injectable } from '@angular/core';
import { BaseApiService } from './base-api.service';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Observable, catchError } from 'rxjs';
import { IPost } from '../models/post.interface';
import { IUser } from '../models/user.interface';
import { ISearchParams } from '../models/search-params.interface';
import { IPostCreate } from '../models/post-create.interface';
import { IPaginatedResponse } from '../models/paginated-response.interface';

@Injectable({
  providedIn: 'root'
})
export class DataService extends BaseApiService {

  constructor(
    private http: HttpClient,
  ) {
    super()
  }

  // Get all users
  public getUsers(): Observable<IUser[]> {
    const url: string = `${this.apiBaseUrl}/users`;

    return this.http.get<IUser[]>(url, { headers: this.baseHeaders }).pipe(
      catchError((err: HttpErrorResponse) => this.handleError(err)),
    );
  }

  // Get all posts
  public getPosts(search: ISearchParams): Observable<IPaginatedResponse<IPost>> {
    const url: string = `${this.apiBaseUrl}/posts`;
    let params: HttpParams = new HttpParams();
    
    params = params.append('limit', search.limit);
    params = params.append('offset', search.offset);

    return this.http.get<IPaginatedResponse<IPost>>(url, { params: params, headers: this.baseHeaders }).pipe(
      catchError((err: HttpErrorResponse) => this.handleError(err)),
    );
  }

  // Create a post
  public createPost(params: IPostCreate): Observable<IPost> {
    const url: string = `${this.apiBaseUrl}/posts`;
    const body: string = JSON.stringify(new Object({
      post_text: params.post_text,
      userid: params.userid,
    }));

    return this.http.post<IPost>(url, body, { headers: this.baseHeaders }).pipe(
      catchError((err: HttpErrorResponse) => this.handleError(err)),
    );
  }

  // Update a post
  public patchPost(id: string, post_text: string): Observable<IPost> {
    const url: string = `${this.apiBaseUrl}/posts/${id}`;
    const body: string = JSON.stringify(new Object({
      post_text: post_text,
    }));
    
    return this.http.patch<IPost>(url, body, { headers: this.baseHeaders }).pipe(
      catchError((err: HttpErrorResponse) => this.handleError(err)),
    );
  }

  // Delete a post
  public deletePost(id: string): Observable<IPost> {
    const url: string = `${this.apiBaseUrl}/posts/${id}`;

    return this.http.delete<IPost>(url, { headers: this.baseHeaders }).pipe(
      catchError((err: HttpErrorResponse) => this.handleError(err)),
    );
  }
}
