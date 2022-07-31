import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Constants } from '../shared/Constants';
import { Lancamento } from '../shared/model/lancamento';
import { Planilha } from '../shared/model/planilha';
import { PlanilhaService } from '../shared/services/planilha.service';

@Component({
  selector: 'app-principal',
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.scss']
})
export class PrincipalComponent implements OnInit {

  group: FormGroup;
  planilhas: Planilha[] = [];
  anos: Set<number> = new Set();
  meses: Set<string> = new Set();

  banners = [
    { href: '/#/lancamento', icon: 'add_card', label: 'Lançamento' },
    { href: '/#/extrato', icon: 'account_balance', label: 'Extrato' },
    { href: '/#/planilha', icon: 'tab', label: 'Planilha' },
    { href: '/#/conta', icon: 'credit_card', label: 'Conta' },
    { href: '/#/categoria', icon: 'dashboard_customize', label: 'Categoria' },
    { href: '/#/carga', icon: 'file_upload', label: 'Carga de Arquivo' },
  ];

  constructor(
    private planilhaService: PlanilhaService,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {

    this.group = this.fb.group({
      ano: [null],
      mes: [null]
    });

    this.planilhaService.findAll().subscribe(data => {
      this.planilhas = data;
      data.forEach(e => {
        this.anos.add(e.ano);
      });
    }, () => { }, () => {
      if (this.anos.size > 0) {
        let hoje = new Date();
        let anoAtual = hoje.getFullYear();
        let mesAtual = hoje.getMonth() + 1;
        this.group.get('ano').setValue(anoAtual);
        this.getPlanilhasDoAno(anoAtual);
        this.group.get('mes').setValue(Constants.meses.get(mesAtual));
      }
    });
  }

  getPlanilhasDoAno(ano: number) {
    this.meses.clear();
    let fil = this.planilhas.filter(o => o.ano == ano);
    fil.forEach(e => {
      this.meses.add(e.descricao);
    });
  }

}