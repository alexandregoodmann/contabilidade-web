import { Component, OnInit, ViewChild } from '@angular/core';
import { MatAccordion } from '@angular/material';
import { Router } from '@angular/router';
import { Conta } from '../shared/model/conta';
import { Lancamento } from '../shared/model/lancamento';
import { LancamentoService } from '../shared/services/lancamento.service';

@Component({
  selector: 'app-extrato',
  templateUrl: './extrato.component.html',
  styleUrls: ['./extrato.component.css']
})
export class ExtratoComponent implements OnInit {

  displayedColumns: string[] = ['data', 'categoria', 'descricao', 'valor', 'concluido'];
  contas: Conta[];
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
    });
  }

  editar(lancamento) {
    this.router.navigate(['/lancamento'], { queryParams: lancamento });
  }

}

