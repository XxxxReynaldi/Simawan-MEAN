import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  // apiUrl: any = 'http://api.sunhouse.co.id/bookstore/index.php/';
  apiUrl: any = 'http://localhost:4000/api/v1';
  constructor(public http: HttpClient) {}

  get(url: any = null) {
    return this.http.get(this.apiUrl + url);
  }
}
