import { Component, OnInit, ViewChild } from '@angular/core';
import { MatAccordion } from '@angular/material';
import { Router } from '@angular/router';
import { Conta } from '../shared/model/conta';
import { Lancamento } from '../shared/model/lancamento';
import { LancamentoService } from '../shared/services/lancamento.service';

@Component({
  selector: 'app-extrato',
  templateUrl: './extrato.component.html',
  styleUrls: ['./extrato.component.scss']
})
export class ExtratoComponent implements OnInit {

  expandido = false;
  displayedColumns: string[] = ['data', 'categoria', 'descricao', 'valor', 'concluido'];
  contas: Conta[];
  order: number = 1;
  saldo: number = 0;
  @ViewChild(MatAccordion, { static: false }) accordion: MatAccordion;

  constructor(
    private lancamentoService: LancamentoService,
    private router: Router
  ) { }

  ngOnInit() {
    this.montarMapa();
  }

  private montarMapa() {
    let mapa = new Map<number, Conta>([]);
    this.lancamentoService.findAll().subscribe(lancamentos => {
      lancamentos.forEach(lanc => {
        let conta = mapa.get(lanc.conta.id);
        if (conta) {
          conta.lancamentos.push(lanc);
          if (lanc.concluido) {
            conta.total = conta.total + lanc.valor;
          }
        } else {
          conta = new Conta();
          conta = lanc.conta;
          conta.lancamentos = [];
          conta.lancamentos.push(lanc);
          conta.total = 0;
          if (lanc.concluido) {
            conta.total = conta.total + lanc.valor;
          }
          mapa.set(conta.id, conta);
        }
      });
      this.contas = Array.from(mapa.values());
console.log(this.contas);

      this.contas.forEach(c => {
        this.saldo = this.saldo + c.total;
      })
    });


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

