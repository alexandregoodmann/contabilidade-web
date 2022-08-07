import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { Planilha } from '../shared/model/planilha';
import { PlanilhaService } from '../shared/services/planilha.service';

@Component({
  selector: 'app-principal',
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.scss']
})
export class PrincipalComponent implements OnInit {

  banners;
  planilhaDoMes: Planilha;

  constructor(
    private planilhaService: PlanilhaService,
    private _snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.getPlanilhaMes();
  }

  private getPlanilhaMes() {
    let hoje = new Date();
    this.planilhaService.getPlanilhaMes(hoje.getFullYear(), hoje.getMonth() + 1).subscribe(data => {
      this.planilhaDoMes = data;
    }, (err) => { }, () => {
      this.planilhaService.setPlanilhaMes(this.planilhaDoMes);
      this.getBanners();
    });
  }

  menu = [
    { href: '/#/planilha', icon: 'tab', label: 'Planilha' },
    { href: '/#/conta', icon: 'credit_card', label: 'Conta' },
    { href: '/#/categoria', icon: 'dashboard_customize', label: 'Categoria' },
    { href: '/#/lancamento', icon: 'add_card', label: 'Lançamento' },
    { href: '/#/extrato', icon: 'account_balance', label: 'Extrato' },
    { href: '/#/carga', icon: 'file_upload', label: 'Carga de Arquivo' },
  ];

  private getBanners() {
    if (this.planilhaDoMes.id != undefined) {
      this.banners = this.menu;
    } else {
      this.banners = [{ href: '/#/planilha', icon: 'tab', label: 'Planilha' }];
      this.openSnackBar();
    }
  }

  private openSnackBar() {
    this._snackBar.open('Primeiramente cadastre uma Planilha', 'Fechar', {
      horizontalPosition: 'center',
      verticalPosition: 'top'
    });
  }
}