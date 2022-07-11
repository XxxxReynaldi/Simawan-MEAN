import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, retry, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private API_URL = environment.API_URL;
  apiUrl: any = `${this.API_URL}/api/v1/auth`;
  constructor(private http: HttpClient) {}

  isLoggedIn() {
    return localStorage.getItem('token') != null;
  }

  setSignIn(user: any): Observable<any> {
    return this.http
      .post<any>(`${this.apiUrl}/signin`, user)
      .pipe(retry(1), catchError(this.handleError));
  }

  setSignUp(user: any) {
    return this.http
      .post(`${this.apiUrl}/signup`, user)
      .pipe(catchError(this.handleError));
  }

  handleError(error: any) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // client-side error
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }

    return throwError(() => {
      return error;
    });
  }
}
