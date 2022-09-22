import { Component, OnInit, ViewChild } from '@angular/core';
import { MatAccordion } from '@angular/material';
import { Router } from '@angular/router';
import { Categoria } from '../shared/model/categoria';
import { Lancamento } from '../shared/model/lancamento';
import { Planilha } from '../shared/model/planilha';
import { CategoriaService } from '../shared/services/categoria.service';
import { LancamentoService } from '../shared/services/lancamento.service';
import { PlanilhaService } from '../shared/services/planilha.service';

@Component({
  selector: 'app-extrato',
  templateUrl: './extrato.component.html',
  styleUrls: ['./extrato.component.scss']
})
export class ExtratoComponent implements OnInit {

  expandido = false;
  displayedColumns: string[] = ['acao', 'data', 'categoria', 'descricao', 'valor', 'concluido'];
  contas: any;
  order: number = 1;
  saldo: number = 0;
  planilhaSelecionada: Planilha;
  marcados: Lancamento[] = [];
  categorias: Categoria[];

  @ViewChild(MatAccordion, { static: false }) accordion: MatAccordion;

  constructor(
    private planilhaService: PlanilhaService,
    private lancamentoService: LancamentoService,
    private categoriaService: CategoriaService,
    private router: Router
  ) { }

  ngOnInit() {
    this.planilhaService.planilhaSelecionada.subscribe(planilha => {
      this.planilhaSelecionada = planilha;
    });

    if (this.planilhaSelecionada.id != undefined) {
      this.findExtrato();
    }

    this.categoriaService.findAll().subscribe(data => { this.categorias = data });
  }

  private findExtrato() {
    this.planilhaService.getExtrato(this.planilhaSelecionada.id).subscribe(data => {
      this.contas = data;
      this.contas.forEach(conta => {
        if (conta.tipo == 'CC')
          this.saldo = this.saldo + conta.total;
      });
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

  marcar(event: any, item: Lancamento) {
    if (event.checked) {
      item.marcado = true;
      this.marcados.push(item);
    } else {
      item.marcado = false;
      let i = this.marcados.indexOf(item);
      this.marcados.splice(i, 1);
    }
  }

  marcarTodos(event: any, lancamentos: Lancamento[]) {
    this.marcados = [];
    if (event.checked) {
      lancamentos.forEach(l => { l.marcado = true });
      this.marcados = lancamentos;
    } else {
      lancamentos.forEach(l => { l.marcado = false });
    }
  }

  acaoMenu(acao: string, categoria?: Categoria) {
    switch (acao) {
      case 'APAGAR':
        this.deleteAll();
        break;
      case 'CONCLUIR':
        console.log('concluir', this.marcados);

        break;
      case 'CATEGORIZAR':
        console.log(this.marcados, categoria);
        break;

      default:
        break;
    }
  }

  private deleteAll() {

    let ids: number[] = [];
    this.marcados.forEach(m => {
      ids.push(m.id);
    });

    this.lancamentoService.deleteAll(ids).subscribe(() => { }, () => { }, () => {
      this.marcados = [];
      this.findExtrato();
    });

  }
}

