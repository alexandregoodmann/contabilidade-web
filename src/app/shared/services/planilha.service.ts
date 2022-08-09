import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Planilha } from '../model/planilha';
import { BasicCrudService } from './basic-crud.service';

@Injectable({
  providedIn: 'root'
})
export class PlanilhaService extends BasicCrudService<Planilha> {

  private selectBehavior = new BehaviorSubject<Map<number, Array<string>>>(new Map<number, Array<string>>());
  selectObservable = this.selectBehavior.asObservable();

  setSelectObservable(mapa){
    this.selectBehavior.next(mapa);
  }

  constructor(private http: HttpClient) {
    super(`${environment.url}/planilhas`, http);
  }

  getPlanilhaMes(ano: number, mes: number) {
    return this.http.get<Planilha>(`${environment.url}/planilhas/${ano}/${mes}`);
  }

}
