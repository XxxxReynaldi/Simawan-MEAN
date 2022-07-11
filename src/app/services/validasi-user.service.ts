import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, retry, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';

class DataTablesResponse {
  data?: any[];
  draw?: number;
  recordsFiltered?: number;
  recordsTotal?: number;
}

@Injectable({
  providedIn: 'root',
})
export class ValidasiUserService {
  private API_URL = environment.API_URL;
  apiUrl: any = `${this.API_URL}/api/v1/user`;
  constructor(private http: HttpClient) {}

  generateNIS(data: any): Observable<any> {
    return this.http
      .post<any>(`${this.apiUrl}/generate-nis`, data)
      .pipe(catchError(this.handleError));
  }

  getAllValidation(data: any): Observable<DataTablesResponse> {
    return this.http
      .post<DataTablesResponse>(`${this.apiUrl}/validation`, data)
      .pipe(catchError(this.handleError));
  }

  validation(data: any, id: string): Observable<any> {
    return this.http.patch<any>(`${this.apiUrl}/validation/${id}`, data);
  }

  destroyUser(id: string): Observable<any> {
    return this.http
      .delete<any>(`${this.apiUrl}/destroy/${id}`)
      .pipe(retry(1), catchError(this.handleError));
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
