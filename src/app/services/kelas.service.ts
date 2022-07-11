import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, retry, throwError } from 'rxjs';

import { environment } from 'src/environments/environment';

class KelasTypes {
  constructor(
    _id: string,
    tingkatan: string,
    keahlian: Object,
    abjad: string,
    tahunAjaran: string,
    kode: string,
    keterangan: string,
    status: string
  ) {}
}

@Injectable({
  providedIn: 'root',
})
export class KelasService {
  private API_URL = environment.API_URL;
  apiUrl: any = `${this.API_URL}/api/v1/kelas`;
  constructor(private http: HttpClient) {}

  storeKelas(data: any): Observable<KelasTypes> {
    return this.http.post<KelasTypes>(`${this.apiUrl}/store`, data);
  }

  getAllKelas(): Observable<KelasTypes> {
    return this.http
      .get<KelasTypes>(`${this.apiUrl}`)
      .pipe(retry(1), catchError(this.handleError));
  }

  showKelas(id: string): Observable<KelasTypes> {
    return this.http
      .get<KelasTypes>(`${this.apiUrl}/show/${id}`)
      .pipe(retry(1), catchError(this.handleError));
  }

  updateKelas(data: any, id: string): Observable<KelasTypes> {
    return this.http.patch<KelasTypes>(`${this.apiUrl}/update/${id}`, data);
  }

  destroyKelas(id: string): Observable<KelasTypes> {
    return this.http
      .delete<KelasTypes>(`${this.apiUrl}/destroy/${id}`)
      .pipe(retry(1), catchError(this.handleError));
  }

  statusKelas(id: string): Observable<KelasTypes> {
    return this.http.patch<KelasTypes>(`${this.apiUrl}/update/${id}`, null);
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
