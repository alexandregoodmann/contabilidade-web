import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class BasicCrudService<T> {

  url;

  constructor(private http: HttpClient) {
  }

  create(obj): Observable<T> {
    return this.http.post<T>(this.url, obj, httpOptions).pipe(
      catchError(this.handleError<T>('create'))
    );
  }

  update(obj): Observable<T> {
    return this.http.put<T>(this.url, obj, httpOptions)
      .pipe(
        catchError(this.handleError('update', obj))
      );
  }

  delete(id: string): Observable<{}> {
    return this.http.delete(`${this.url}/${id}`, httpOptions)
      .pipe(
        catchError(this.handleError('delete'))
      );
  }

  findById(id: string) {
    return this.http.get<T>(`${this.url}/${id}`);
  }

  findAll() {
    return this.http.get<T>(this.url);
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      return of(result as T);
    };
  }

}

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};