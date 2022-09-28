import { Component, OnInit, ViewChild } from '@angular/core';
import { MatAccordion } from '@angular/material';
import { Router } from '@angular/router';
import { Categoria } from '../shared/model/categoria';
import { TipoContaEnum } from '../shared/model/conta';
import { Extrato } from '../shared/model/extrato';
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

  displayedColumns: string[] = ['acao', 'data', 'categoria', 'descricao', 'valor', 'concluido'];
  extrato: Extrato[];
  order: number = 1;
  saldo: number = 0;
  planilhaSelecionada: Planilha;
  marcados: Lancamento[] = [];
  categorias: Categoria[];
  expandidos: Map<number, boolean> = new Map<number, boolean>();

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
      this.extrato = data as Extrato[];
      this.extrato.forEach(conta => {
        if (conta.tipo == TipoContaEnum.CC)
          this.saldo = this.saldo + conta.total;
      });
    });
  }

  editar(idLancamento) {
    this.router.navigate(['/lancamento'], { queryParams: { idLancamento: idLancamento } });
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

    this.extrato[indexConta].lancamentos = Array.from(lancamentos);
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
        this.concluirMarcados();
        break;
      case 'CATEGORIZAR':
        this.categorizar(categoria);
        break;

      default:
        break;
    }
  }

  private concluirMarcados() {
    this.lancamentoService.concluir(this.marcados.map(n => n.id)).subscribe(() => { }, () => { }, () => {
      this.marcados = [];
      this.findExtrato();
    });
  }

  private deleteAll() {
    this.lancamentoService.deleteAll(this.marcados.map(n => n.id)).subscribe(() => { }, () => { }, () => {
      this.marcados = [];
      this.findExtrato();
    });
  }

  private categorizar(categoria: Categoria) {
    this.lancamentoService.categorizar(this.marcados.map(n => n.id), categoria).subscribe(() => { }, () => { }, () => {
      this.marcados = [];
      this.findExtrato();
    });
  }

  isExpanded(id: number) {
    return this.expandidos.get(id);
  }

  expand(conta: Extrato) {
    if (this.expandidos.has(conta.id)) {
      let e = this.expandidos.get(conta.id);
      this.expandidos.set(conta.id, !e);
    } else {
      this.expandidos.set(conta.id, true);
    }
  }
}

