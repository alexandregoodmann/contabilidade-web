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

  private planilhaBehavior = new BehaviorSubject<Planilha>(new Planilha());
  planilhaObservable = this.planilhaBehavior.asObservable();

  constructor(private http: HttpClient) {
    super(`${environment.url}/planilhas`, http);
  }

  setPlanilhaMes(planilha: Planilha) {
    this.planilhaBehavior.next(planilha);
  }

  getPlanilhaMes(ano: number, mes: number) {
    return this.http.get<Planilha>(`${environment.url}/planilhas/${ano}/${mes}`);
  }

}
