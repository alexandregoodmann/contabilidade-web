import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BasicCrudService {

  constructor(private http: HttpClient) { }

  create<T>(url, obj): Observable<T> {
    return this.http.post<T>(url, obj, httpOptions).pipe(
      catchError(this.handleError<T>('create'))
    );
  }

  update<T>(url, obj): Observable<T> {
    return this.http.put<T>(url, obj, httpOptions)
      .pipe(
        catchError(this.handleError('update', obj))
      );
  }

  delete(url, id: string): Observable<{}> {
    const u = `${url}/${id}`;
    console.log(u);
    
    return this.http.delete(u, httpOptions)
      .pipe(
        catchError(this.handleError('delete'))
      );
  }

  findById<T>(url, id: string) {
    return this.http.get<T>(`${url}/${id}`);
  }

  findAll<T>(url) {
    return this.http.get<T>(url);
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