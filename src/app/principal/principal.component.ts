import { Component } from '@angular/core';

@Component({
  selector: 'app-principal',
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.scss']
})
export class PrincipalComponent {

  banners = [
    { href: '/#/planilha', icon: 'tab', label: 'Planilha' },
    { href: '/#/conta', icon: 'credit_card', label: 'Conta' },
    { href: '/#/categoria', icon: 'dashboard_customize', label: 'Categoria' }
  ];

  constructor() { }

}
