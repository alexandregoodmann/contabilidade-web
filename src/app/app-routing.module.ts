import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConfiguracaoComponent } from './configuracao/configuracao.component';
import { LancamentoRapidoComponent } from './lancamento-rapido/lancamento-rapido.component';
import { LancamentoComponent } from './lancamento/lancamento.component';
import { ListaLancamentoComponent } from './lista-lancamento/lista-lancamento.component';
import { PrincipalComponent } from './principal/principal.component';

const routes: Routes = [
  {
    path: 'principal',
    component: PrincipalComponent,
    data: { title: 'Tela Principal' }
  },
  {
    path: 'lancamento',
    component: LancamentoComponent,
    data: { title: 'Lançamento' }
  },
  {
    path: 'lancamento-rapido',
    component: LancamentoRapidoComponent,
    data: { title: 'Lançamento' }
  },
  {
    path: 'lista-lancamento',
    component: ListaLancamentoComponent,
    data: { title: 'Lançamento' }
  },
  {
    path: 'configuracao',
    component: ConfiguracaoComponent,
    data: { title: 'Lançamento' }
  },
  {
    path: '',
    redirectTo: '/principal',
    pathMatch: 'full'
  },
  { path: '**', component: PrincipalComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
