import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { Injectable } from '@angular/core';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'text/html',
  }),
};

@Injectable({
  providedIn: 'root',
})
export class StoreAccountService {
  private url = 'http://localhost:3000/';
  constructor(private http: HttpClient) {}

  addAccount(data: any): Observable<any> {
    return this.http.post<any>(`${this.url}addaccount`, data);
  }

  getAccount(data: any): Observable<any> {
    return this.http.post<any>(`${this.url}getaccount`, data, httpOptions);
  }
  
  updateAccount(data: any): Observable<any> {    
    return this.http.post<any>(`${this.url}updateaccount`, data);
  }
}
