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

  private mapaDeplanilhasDoAnoB = new BehaviorSubject<Map<number, Array<string>>>(new Map<number, Array<string>>());
  planilhasDoAno = this.mapaDeplanilhasDoAnoB.asObservable();

  private planilhaAtualB = new BehaviorSubject<Planilha>(new Planilha());
  planilhaAtual = this.planilhaAtualB.asObservable();

  constructor(private http: HttpClient) {
    super(`${environment.url}/planilhas`, http);
  }

  getPlanilha(ano: number, mes: number) {
    return this.http.get<Planilha>(`${environment.url}/planilhas/${ano}/${mes}`);
  }

  setPlanilhaAtual(planilhas: Planilha[]) {
    let hoje = new Date();
    let ano = planilhas.filter(o => o.ano == hoje.getFullYear());
    if (ano.length > 0) {
      let mes = ano.filter(o => o.mes == (hoje.getMonth() + 1));
      if (mes.length > 0) {
        this.planilhaAtualB.next(mes[0]);
      } else {
        let i = ano.length - 1;
        this.planilhaAtualB.next(ano[i]);
      }
    } else {
      this.planilhaAtualB.next(planilhas[0]);
    }
  }

  montaMapaPlanilhas(planilhas: Planilha[]) {
    let mapa: Map<number, Array<string>> = new Map<number, Array<string>>();
    planilhas.forEach(e => {
      if (mapa.has(e.ano)) {
        let meses = mapa.get(e.ano);
        meses.push(e.descricao);
        mapa.set(e.ano, meses);
      } else {
        let meses: string[] = [];
        meses.push(e.descricao);
        mapa.set(e.ano, meses);
      }
    });
    this.mapaDeplanilhasDoAnoB.next(mapa);
  }

}
