import { Injectable } from '@angular/core';
import { HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BaseApiService {

  public apiBaseUrl: string = `${(window as any)['env']['apiUrl']}/api/v1`;
  public baseHeaders: HttpHeaders = new HttpHeaders({'Content-Type': 'application/json'});

  constructor() { }

  protected handleError(error: HttpErrorResponse) {
    let errorMessage = '';
    
    if (error.error instanceof ErrorEvent) {
      // client-side error
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }

    console.log(errorMessage);

    return throwError(() => errorMessage);
  }
}
