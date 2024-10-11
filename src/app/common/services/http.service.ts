import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class HttpService {

  constructor(private http: HttpClient) {}

  private handleError(error: any) {
    console.error('An error occurred:', error); // Log to console for debugging
    return throwError(() => error.error || new Error('Server error'));
  }

  // GET request
  get<T>(endpoint: string, params?: HttpParams): Observable<T> {
    return this.http.get<T>(`${endpoint}`, { params })
      .pipe(catchError(this.handleError));
  }

  // POST request
  post<T>(endpoint: string, body: any): Observable<T> {
    return this.http.post<T>(`${endpoint}`, body)
      .pipe(catchError(this.handleError));
  }

  // PUT request
  put<T>(endpoint: string, body: any): Observable<T> {
    return this.http.put<T>(`${endpoint}`, body)
      .pipe(catchError(this.handleError));
  }

  // DELETE request
  delete<T>(endpoint: string): Observable<T> {
    return this.http.delete<T>(`${endpoint}`)
      .pipe(catchError(this.handleError));
  }
}