import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PrincipalComponent } from './principal/principal.component';
import { LancamentoComponent } from './lancamento/lancamento.component';

const routes: Routes = [
  {
    path: 'principal',
    component: PrincipalComponent,
    data: { title: 'Tela Principal' }
  },
  {
    path: 'lancamento/:categoria',
    component: LancamentoComponent,
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
