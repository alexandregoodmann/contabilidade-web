import { Component } from '@angular/core';

@Component({
  selector: 'app-configuracao',
  templateUrl: './configuracao.component.html',
  styleUrls: ['./configuracao.component.css']
})
export class ConfiguracaoComponent {

  contas: string[] = ['Débito Santander', 'Crédito Santander', 'Carteira']

  categorias: string[] = ['Alimentação', 'Saúde', 'Carro']

  constructor() { }

}
