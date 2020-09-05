import { Component } from '@angular/core';
import { Lancamento } from 'src/app/shared/model/lancamento';

@Component({
  selector: 'app-lista-lancamento',
  templateUrl: './lista-lancamento.component.html',
  styleUrls: ['./lista-lancamento.component.css']
})
export class ListaLancamentoComponent {

  private list: Lancamento[] = LANCAMENTOS;

}

const LANCAMENTOS: Lancamento[] = [
  { "dtLancamento": "03/19/2019 21:24:56", "conta": "Carteira", "categoria": "Alexandre", "data": "03/19/2019", "descricao": "Café", "valor": 3 },
  { "dtLancamento": "09/19/2019 10:42:05", "conta": "Crédito Santander", "categoria": "Alexandre", "data": "09/18/2019", "descricao": "Corte Cabelo", "valor": 60 },
  { "dtLancamento": "09/19/2019 15:45:37", "conta": "Carteira", "categoria": "Alexandre", "data": "09/19/2019", "descricao": "Menta e chocolate", "valor": 14 },
  { "dtLancamento": "09/16/2019 23:33:08", "conta": "Carteira", "categoria": "Alimentação", "data": "09/16/2019", "descricao": "Lanche puc", "valor": 11.5 },
  { "dtLancamento": "09/18/2019 15:05:51", "conta": "Carteira", "categoria": "Alimentação", "data": "09/17/2019", "descricao": "Lanche", "valor": -4 },
  { "dtLancamento": "09/18/2019 18:24:08", "conta": "Carteira", "categoria": "Alimentação", "data": "09/18/2019", "descricao": "Lanche Puc", "valor": -9.5 },
  { "dtLancamento": "09/19/2019 10:39:12", "conta": "Santander", "categoria": "Alimentação", "data": "09/18/2019", "descricao": "Cerveja, Cigarro e Café (Posto)", "valor": -32.45 },
  { "dtLancamento": "09/24/2019 08:51:28", "conta": "Carteira", "categoria": "Alimentação", "data": "09/24/2019", "descricao": "Café puc", "valor": -7 },
  { "dtLancamento": "10/04/2019 19:27:00", "conta": "Santander", "categoria": "Alimentação", "data": "10/04/2019", "descricao": "Pe de manga", "valor": -5 },
  { "dtLancamento": "03/18/2019 14:54:59", "conta": "Santander", "categoria": "Almoço", "data": "03/18/2019", "descricao": "Bela Gula Flávio e Lucas", "valor": -22 },
  { "dtLancamento": "03/18/2019 22:37:09", "conta": "Santander", "categoria": "Almoço", "data": "03/18/2019", "descricao": "Lanche puc", "valor": 8.5 },
  { "dtLancamento": "03/19/2019 12:14:35", "conta": "Santander", "categoria": "Almoço", "data": "03/19/2019", "descricao": "Almoço sushi", "valor": 28.5 },
  { "dtLancamento": "03/19/2019 21:25:40", "conta": "Santander", "categoria": "Almoço", "data": "03/19/2019", "descricao": "Janta", "valor": -12.9 },
  { "dtLancamento": "03/20/2019 17:30:10", "conta": "Santander", "categoria": "Almoço", "data": "03/20/2019", "descricao": "RU", "valor": -8.5 },
  { "dtLancamento": "03/21/2019 14:03:17", "conta": "Santander", "categoria": "Almoço", "data": "03/21/2019", "descricao": "RU", "valor": -8.5 },
  { "dtLancamento": "09/19/2019 15:46:15", "conta": "Santander", "categoria": "Almoço", "data": "09/19/2019", "descricao": "Almoço Mercado", "valor": -80 },
  { "dtLancamento": "09/16/2019 23:34:09", "conta": "Santander", "categoria": "Carro", "data": "09/16/2019", "descricao": "Estacionamento puc", "valor": 57.6 },
  { "dtLancamento": "09/19/2019 09:59:21", "conta": "Santander", "categoria": "Carro", "data": "09/18/2019", "descricao": "Estacionamento PUC Hospital", "valor": 6.5 },
  { "dtLancamento": "09/19/2019 15:46:37", "conta": "Carteira", "categoria": "Carro", "data": "09/19/2019", "descricao": "Estacionamento", "valor": -20 },
  { "dtLancamento": "09/19/2019 10:05:35", "conta": "Crédito Santander", "categoria": "Diversão", "data": "09/15/2019", "descricao": "Churrasco Parque Gabriel", "valor": -156.24 },
  { "dtLancamento": "09/19/2019 10:07:22", "conta": "Crédito Santander", "categoria": "Diversão", "data": "09/15/2019", "descricao": "Churrasco Parque Gabriel (Gessepel)", "valor": -68.65 },
  { "dtLancamento": "09/23/2019 19:51:21", "conta": "Santander", "categoria": "Diversão", "data": "09/23/2019", "descricao": "Churrasco Stefan", "valor": 28 },
  { "dtLancamento": "09/18/2019 15:05:02", "conta": "Carteira", "categoria": "Educação", "data": "09/17/2019", "descricao": "Multa Livro Biblioteca", "valor": 2 },
  { "dtLancamento": "03/21/2019 18:58:52", "conta": "Santander", "categoria": "Jantar", "data": "03/21/2019", "descricao": "Garden", "valor": -15.8 },
  { "dtLancamento": "03/18/2019 22:39:53", "conta": "Santander", "categoria": "Saúde", "data": "03/18/2019", "descricao": "Escova de Dente", "valor": -14 }
];