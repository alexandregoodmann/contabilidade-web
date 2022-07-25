import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Lancamento } from '../model/lancamento';
import { BasicCrudService } from './basic-crud.service';

@Injectable({
  providedIn: 'root'
})
export class LancamentoService extends BasicCrudService<Lancamento> {

  constructor(private http: HttpClient) {
    super(`${environment.url}/lancamentos`, http);
  }

}
