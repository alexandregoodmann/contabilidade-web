import { Component } from '@angular/core';

@Component({
  selector: 'app-principal',
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.scss']
})
export class PrincipalComponent {

  banners = [
    { href: '/#/banco', icon: 'account_balance', label: 'Banco' },
    { href: '/#/conta', icon: 'credit_card', label: 'Conta' },
    { href: '/#/categoria', icon: 'dashboard_customize', label: 'Categoria' },
    { href: '/#/lancamento', icon: 'monetization_on', label: 'Lançamento' },
    { href: '/#/extrato', icon: 'receipt', label: 'Extrato' }
    // { href: '/#/carga', icon: 'input', label: 'Carga de Lançamentos' }
  ];

  constructor() { }

}
