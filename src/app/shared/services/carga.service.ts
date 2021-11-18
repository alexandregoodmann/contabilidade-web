import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { BasicCrudService, httpOptions } from './basic-crud.service';

@Injectable({
  providedIn: 'root'
})
export class CargaService {

  constructor(private http: HttpClient) { }

  carga(obj): Observable<any> {
    return this.http.post<any>(`${environment.url}/carga`, obj, httpOptions).pipe(
      catchError(this.handleError<any>('create'))
    );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      return of(result as T);
    };
  }

}
