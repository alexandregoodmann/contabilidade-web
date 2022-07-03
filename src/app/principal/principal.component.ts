import { Component } from '@angular/core';

@Component({
  selector: 'app-principal',
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.scss']
})
export class PrincipalComponent {

  banners = [
    { href: '/#/conta', icon: 'credit_card', label: 'Conta' },
    { href: '/#/planilha', icon: 'tab', label: 'Planilha' },
    { href: '/#/categoria', icon: 'dashboard_customize', label: 'Categoria' },
    { href: '/#/lancamento', icon: 'monetization_on', label: 'Lançamento' }
  ];

  constructor() { }

}
