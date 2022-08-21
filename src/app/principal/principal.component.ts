import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { Categoria } from '../shared/model/categoria';
import { Conta } from '../shared/model/conta';
import { Planilha } from '../shared/model/planilha';
import { CategoriaService } from '../shared/services/categoria.service';
import { ContaService } from '../shared/services/conta.service';
import { PlanilhaService } from '../shared/services/planilha.service';

@Component({
  selector: 'app-principal',
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.scss']
})
export class PrincipalComponent implements OnInit {

  planilhas: Planilha[] = [];
  contas: Conta[] = [];
  categorias: Categoria[] = [];
  planilhaDoMes: Planilha;

  banners = [];
  menu = [
    { href: '/#/planilha', icon: 'tab', label: 'Planilha' },
    { href: '/#/conta', icon: 'credit_card', label: 'Conta' },
    { href: '/#/categoria', icon: 'dashboard_customize', label: 'Categoria' },
    { href: '/#/lancamento', icon: 'add_card', label: 'Lançamento' },
    { href: '/#/extrato', icon: 'account_balance', label: 'Extrato' },
    { href: '/#/carga', icon: 'file_upload', label: 'Carga de Arquivo' },
  ];

  constructor(
    private planilhaService: PlanilhaService,
    private contaService: ContaService,
    private categoriaService: CategoriaService,
    private _snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.getPlanilhas();
  }

  private getPlanilhas() {
    this.banners.push(this.menu[0]);
    this.planilhaService.findAll().subscribe(data => {
      this.planilhas = data;
    }, (err) => { }, () => {
      //verifica se existe planilha
      if (this.planilhas.length == 0) {
        this.openSnackBar('Você precisa cadastrar uma Planilha');
      } else {
        this.getContas();
        this.getCategorias();
      }
      this.montaSelect();
    });
  }

  private getContas() {
    this.banners.push(this.menu[1]);
    this.contaService.findAll().subscribe(data => {
      this.contas = data;
    }, (err) => { }, () => {
      if (this.contas.length == 0) {
        this.openSnackBar('Você precisa cadastrar uma Conta');
      } else if (this.categorias.length > 0) {
        this.banners = this.menu;
      }
    });
  }

  private getCategorias() {
    this.banners.push(this.menu[2]);
    this.categoriaService.findAll().subscribe(data => {
      this.categorias = data;
    }, (err) => { }, () => {
      if (this.categorias.length == 0) {
        this.openSnackBar('Você precisa cadastrar uma Categoria');
      } else if (this.contas.length > 0) {
        this.banners = this.menu;
      }
    });
  }

  private montaSelect() {
    let mapa: Map<number, Array<string>> = new Map<number, Array<string>>();
    this.planilhas.forEach(e => {
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
    this.planilhaService.setSelectObservable(mapa);
  }

  private openSnackBar(msg: string) {
    this._snackBar.open(msg, 'Fechar', {
      horizontalPosition: 'center',
      verticalPosition: 'bottom'
    });
  }

}