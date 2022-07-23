import { Component } from '@angular/core';

@Component({
  selector: 'app-principal',
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.scss']
})
export class PrincipalComponent {

  banners = [
    { href: '/#/lancamento', icon: 'add_card', label: 'Lançamento' },
    { href: '/#/extrato', icon: 'account_balance', label: 'Extrato' },
    { href: '/#/planilha', icon: 'tab', label: 'Planilha' },
    { href: '/#/conta', icon: 'credit_card', label: 'Conta' },
    { href: '/#/categoria', icon: 'dashboard_customize', label: 'Categoria' }
  ];

  constructor() { }

}
