import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, retry, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';

class SiswaTypes {
  constructor(
    _id: string,
    namaLengkap: string,
    NISN: string,
    tempatLahir: string,
    tanggalLahir: Date,
    telp: string,
    email: string,
    kelas: any,
    nis: string
  ) {}
}

@Injectable({
  providedIn: 'root',
})
export class SiswaService {
  private API_URL = environment.API_URL;
  apiUrl: any = `${this.API_URL}/api/v1/siswa`;

  constructor(private http: HttpClient) {}

  storeSiswa(data: any): Observable<SiswaTypes> {
    return this.http.post<SiswaTypes>(`${this.apiUrl}/store`, data);
  }

  getAllSiswa(): Observable<SiswaTypes> {
    return this.http
      .get<SiswaTypes>(`${this.apiUrl}`)
      .pipe(retry(1), catchError(this.handleError));
  }

  showSiswa(id: string): Observable<SiswaTypes> {
    return this.http
      .get<SiswaTypes>(`${this.apiUrl}/show/${id}`)
      .pipe(retry(1), catchError(this.handleError));
  }

  updateSiswa(data: any, id: string): Observable<SiswaTypes> {
    return this.http.patch<SiswaTypes>(`${this.apiUrl}/update/${id}`, data);
  }

  destroySiswa(id: string): Observable<SiswaTypes> {
    return this.http
      .delete<SiswaTypes>(`${this.apiUrl}/destroy/${id}`)
      .pipe(retry(1), catchError(this.handleError));
  }

  statusSiswa(id: string): Observable<SiswaTypes> {
    return this.http.patch<SiswaTypes>(`${this.apiUrl}/update/${id}`, null);
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
