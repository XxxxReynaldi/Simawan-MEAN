import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, retry, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';

class JurusanTypes {
  constructor(
    _id: string,
    bidangKeahlian: string,
    programKeahlian: string,
    paketKeahlian: string,
    singkatan: string,
    kode: string,
    warna: string,
    status: string
  ) {}
}

@Injectable({
  providedIn: 'root',
})
export class JurusanService {
  private API_URL = environment.API_URL;
  apiUrl: any = `${this.API_URL}/api/v1/jurusan`;

  constructor(private http: HttpClient) {}

  storeJurusan(data: any): Observable<JurusanTypes> {
    return this.http.post<JurusanTypes>(`${this.apiUrl}/store`, data);
  }

  getAllJurusan(): Observable<JurusanTypes> {
    return this.http
      .get<JurusanTypes>(`${this.apiUrl}`)
      .pipe(retry(1), catchError(this.handleError));
  }

  showJurusan(id: string): Observable<JurusanTypes> {
    return this.http
      .get<JurusanTypes>(`${this.apiUrl}/show/${id}`)
      .pipe(retry(1), catchError(this.handleError));
  }

  updateJurusan(data: any, id: string): Observable<JurusanTypes> {
    return this.http.patch<JurusanTypes>(`${this.apiUrl}/update/${id}`, data);
  }

  destroyJurusan(id: string): Observable<JurusanTypes> {
    return this.http
      .delete<JurusanTypes>(`${this.apiUrl}/destroy/${id}`)
      .pipe(retry(1), catchError(this.handleError));
  }

  statusJurusan(id: string): Observable<JurusanTypes> {
    return this.http.patch<JurusanTypes>(`${this.apiUrl}/update/${id}`, null);
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
