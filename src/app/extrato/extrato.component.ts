import { Component, OnInit, ViewChild } from '@angular/core';
import { MatAccordion } from '@angular/material';
import { Router } from '@angular/router';
import { Lancamento } from '../shared/model/lancamento';
import { Planilha } from '../shared/model/planilha';
import { PlanilhaService } from '../shared/services/planilha.service';

@Component({
  selector: 'app-extrato',
  templateUrl: './extrato.component.html',
  styleUrls: ['./extrato.component.scss']
})
export class ExtratoComponent implements OnInit {

  expandido = false;
  displayedColumns: string[] = ['data', 'categoria', 'descricao', 'valor', 'concluido'];
  contas: any;
  order: number = 1;
  saldo: number = 0;
  planilhaSelecionada: Planilha;

  @ViewChild(MatAccordion, { static: false }) accordion: MatAccordion;

  constructor(
    private planilhaService: PlanilhaService,
    private router: Router
  ) { }

  ngOnInit() {

    this.planilhaService.planilhaSelecionada.subscribe(planilha => {
      this.planilhaSelecionada = planilha;
    });

    if (this.planilhaSelecionada.id != undefined) {
      this.planilhaService.getExtrato(this.planilhaSelecionada.id).subscribe(data => {
        this.contas = data;
        this.contas.forEach(conta => {
          this.saldo = this.saldo + conta.total;
        });
      });
    }
  }

  editar(lancamento) {
    this.router.navigate(['/lancamento'], { queryParams: lancamento });
  }

  sortBy(indexConta: number, lancamentos: Lancamento[], coluna: string) {
    let ret = this.order;
    lancamentos.sort(function (x, y) {
      if (x[coluna] > y[coluna]) {
        return ret;
      }
      if (x[coluna] < y[coluna]) {
        return ret * (-1);
      }
      return 0;
    });

    this.contas[indexConta].lancamentos = Array.from(lancamentos);
    this.order = this.order * (-1);
  }
}

