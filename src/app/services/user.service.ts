import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, retry, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';

class AdminProfileTypes {
  constructor(_id: string, email: string, namaLengkap: string) {}
}

class PasswordChangeTypes {
  constructor(
    _id: string,
    oldPassword: string,
    newPassword: string,
    confirmPass: string
  ) {}
}

class UserTypes {
  constructor(
    _id: string,
    email: string,
    namaLengkap: string,
    password: string,
    role: string,
    status: string,
    foto: string
  ) {}
}

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private API_URL = environment.API_URL;
  apiUrl: any = `${this.API_URL}/api/v1/user`;
  constructor(private http: HttpClient) {}

  getDataUser(id: string): Observable<UserTypes> {
    return this.http
      .get<UserTypes>(`${this.apiUrl}/show-profile/${id}`)
      .pipe(retry(1), catchError(this.handleError));
  }

  updateProfile(data: any, id: string): Observable<AdminProfileTypes> {
    return this.http.patch<AdminProfileTypes>(
      `${this.apiUrl}/update-profile/${id}`,
      data
    );
  }

  updatePassword(data: any, id: string): Observable<PasswordChangeTypes> {
    return this.http.patch<PasswordChangeTypes>(
      `${this.apiUrl}/update-password/${id}`,
      data
    );
  }

  updatePhoto(data: any, id: string): Observable<any> {
    return this.http.patch<any>(`${this.apiUrl}/update-photo/${id}`, data, {});
  }

  removePhoto(id: string): Observable<any> {
    return this.http.patch<any>(`${this.apiUrl}/remove-photo/${id}`, null);
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
    console.log(error);
    console.log(errorMessage);

    return throwError(() => {
      return error;
    });
  }
}
