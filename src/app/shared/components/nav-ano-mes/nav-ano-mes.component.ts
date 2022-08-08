import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Constants } from '../../Constants';
import { Categoria } from '../../model/categoria';
import { Conta } from '../../model/conta';
import { Planilha } from '../../model/planilha';
import { CategoriaService } from '../../services/categoria.service';
import { ContaService } from '../../services/conta.service';
import { PlanilhaService } from '../../services/planilha.service';

@Component({
  selector: 'app-nav-ano-mes',
  templateUrl: './nav-ano-mes.component.html',
  styleUrls: ['./nav-ano-mes.component.scss']
})
export class NavAnoMesComponent implements OnInit {

  group: FormGroup;
  planilhas: Planilha[] = [];
  contas: Conta[] = [];
  categorias: Categoria[] = [];
  anos: Set<number> = new Set();
  meses: Set<string> = new Set();

  constructor(
    private planilhaService: PlanilhaService,
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    this.group = this.fb.group({
      ano: [null],
      mes: [null]
    });
  }

  private montaSelects() {
    this.planilhaService.findAll().subscribe(data => {
      this.planilhas = data;
      data.forEach(e => {
        this.anos.add(e.ano);
      });
    }, () => { }, () => {

      // verificar se existe planilha no banco de dados
      if (this.anos.size > 0) {
        let hoje = new Date();
        let anoAtual = hoje.getFullYear();

        this.group.get('ano').setValue(anoAtual);
        this.getPlanilhasDoAno(anoAtual);
        this.group.get('mes').setValue(Constants.listaMeses[hoje.getMonth()]);
      }
    });
  }

  getPlanilhasDoAno(ano: number) {
    this.meses.clear();
    let planilhasDoAno = this.planilhas.filter(o => o.ano == ano);
    planilhasDoAno.forEach(mes => {
      this.meses.add(mes.descricao);
    });
  }

  setPlanilha() {
    let model = this.group.value;
    let mes = Constants.listaMeses.indexOf(model.mes) + 1;
    this.planilhaService.getPlanilhaMes(model.getFullYear(), mes).subscribe(data => {
      this.planilhaService.setPlanilhaMes(data);
    }, (err) => { }, () => {
    });
  }
}
