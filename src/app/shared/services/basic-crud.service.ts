import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class BasicCrudService<T> {

  private _url;
  private _http: HttpClient;

  constructor(url: string, http: HttpClient) {
    this._url = url;
    this._http = http;
  }

  create(obj): Observable<T> {
    return this._http.post<T>(this._url, obj, httpOptions).pipe(
      catchError(this.handleError<T>('create'))
    );
  }

  update(obj): Observable<T> {
    return this._http.put<T>(this._url, obj, httpOptions)
      .pipe(
        catchError(this.handleError('update', obj))
      );
  }

  delete(id: string): Observable<{}> {
    return this._http.delete(`${this._url}/${id}`, httpOptions)
      .pipe(
        catchError(this.handleError('delete'))
      );
  }

  findById(id: string) {
    return this._http.get<T>(`${this._url}/${id}`);
  }

  findAll(): Observable<T> {
    return this._http.get<T>(this._url);
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      return of(result as T);
    };
  }

}

export const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};