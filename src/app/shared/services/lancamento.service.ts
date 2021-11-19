import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { CargaJson } from 'src/app/carga/carga.component';
import { environment } from 'src/environments/environment';
import { Lancamento } from '../model/lancamento';
import { BasicCrudService, httpOptions } from './basic-crud.service';

@Injectable({
  providedIn: 'root'
})
export class LancamentoService extends BasicCrudService<Lancamento> {

  constructor(private http: HttpClient) {
    super(`${environment.url}/lancamentos`, http);
  }

  carga(obj: CargaJson) {
    return this.http.post(`${environment.url}/lancamentos/carga`, obj, httpOptions).pipe(
      catchError(this.handleError('create'))
    );
  }
}
