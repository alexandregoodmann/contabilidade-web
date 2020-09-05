import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BasicCrudService {

  private url;
  constructor(private http: HttpClient) { }

  setUrl(crudName: string) {
    this.url = `${environment.url}/${crudName}`;
  }

  create<T>(obj): Observable<T> {
    return this.http.post<T>(this.url, obj, httpOptions).pipe(
      catchError(this.handleError<T>('create'))
    );
  }

  update<T>(obj): Observable<T> {
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

  findById<T>(id: string) {
    return this.http.get<T>(`${this.url}/${id}`);
  }

  findAll<T>() {
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