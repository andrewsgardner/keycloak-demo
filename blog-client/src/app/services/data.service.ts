import { Injectable } from '@angular/core';
import { BaseApiService } from './base-api.service';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Observable, catchError } from 'rxjs';
import { IPost } from '../models/post.interface';

@Injectable({
  providedIn: 'root'
})
export class DataService extends BaseApiService {

  constructor(
    private http: HttpClient,
  ) {
    super()
  }

  // Get all posts
  public getPosts(skip: number = 0, limit: number = 10): Observable<IPost[]> {
    const url: string = `${this.apiBaseUrl}/posts`;
    let params: HttpParams = new HttpParams();
    
    params = params.append('skip', skip);
    params = params.append('limit', limit);

    return this.http.get<IPost[]>(url, { params: params }).pipe(
      catchError((err: HttpErrorResponse) => this.handleError(err)),
    );
  }
}