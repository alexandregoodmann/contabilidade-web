import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Planilha } from '../model/planilha';
import { PlanilhasAno } from '../model/PlanilhasAno';
import { BasicCrudService } from './basic-crud.service';

@Injectable({
  providedIn: 'root'
})
export class PlanilhaService extends BasicCrudService<Planilha> {

  private planilhasAnoB = new BehaviorSubject<Array<PlanilhasAno>>(new Array<PlanilhasAno>());
  planilhasAno = this.planilhasAnoB.asObservable();

  private planilhaAtualB = new BehaviorSubject<Planilha>(new Planilha());
  planilhaAtual = this.planilhaAtualB.asObservable();

  private planilhaSelecionadaB = new BehaviorSubject<Planilha>(new Planilha());
  planilhaSelecionada = this.planilhaSelecionadaB.asObservable();

  constructor(private http: HttpClient) {
    super(`${environment.url}/planilhas`, http);
  }

  setPlanilhasAno(planilhas: PlanilhasAno[]) {
    this.planilhasAnoB.next(planilhas);
  }

  setPlanilhaSelecionada(planilha: Planilha) {
    this.planilhaSelecionadaB.next(planilha);
  }

  getPlanilha(ano: number, mes: number) {
    return this.http.get<Planilha>(`${environment.url}/planilhas/${ano}/${mes}`);
  }

  getMapa() {
    return this.http.get<Array<PlanilhasAno>>(`${environment.url}/planilhas/mapa`);
  }

}
