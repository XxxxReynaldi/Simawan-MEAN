import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, retry, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';

class PelanggaranTypes {
  constructor(
    _id: string,
    jenisPelanggaran: string,
    kategori: string,
    jumlahPoin: number
  ) {}
}

@Injectable({
  providedIn: 'root',
})
export class PelanggaranService {
  private API_URL = environment.API_URL;
  apiUrl: any = `${this.API_URL}/api/v1/pelanggaran`;

  constructor(private http: HttpClient) {}

  storePelanggaran(data: any): Observable<PelanggaranTypes> {
    return this.http.post<PelanggaranTypes>(`${this.apiUrl}/store`, data);
  }

  getAllPelanggaran(): Observable<PelanggaranTypes> {
    return this.http
      .get<PelanggaranTypes>(`${this.apiUrl}`)
      .pipe(retry(1), catchError(this.handleError));
  }

  showPelanggaran(id: string): Observable<PelanggaranTypes> {
    return this.http
      .get<PelanggaranTypes>(`${this.apiUrl}/show/${id}`)
      .pipe(retry(1), catchError(this.handleError));
  }

  updatePelanggaran(data: any, id: string): Observable<PelanggaranTypes> {
    return this.http.patch<PelanggaranTypes>(
      `${this.apiUrl}/update/${id}`,
      data
    );
  }

  destroyPelanggaran(id: string): Observable<PelanggaranTypes> {
    return this.http
      .delete<PelanggaranTypes>(`${this.apiUrl}/destroy/${id}`)
      .pipe(retry(1), catchError(this.handleError));
  }

  statusPelanggaran(id: string): Observable<PelanggaranTypes> {
    return this.http.patch<PelanggaranTypes>(
      `${this.apiUrl}/update/${id}`,
      null
    );
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
