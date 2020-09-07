import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Banco } from '../model/banco';
import { BasicCrudService } from './basic-crud.service';

@Injectable({
  providedIn: 'root'
})
export class BancoService extends BasicCrudService<Banco> {

  constructor(private http: HttpClient) {
    super(`${environment.url}/bancos`, http);
  }

}
