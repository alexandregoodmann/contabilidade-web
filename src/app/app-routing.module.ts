import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LancamentoComponent } from './lancamento/lancamento.component';
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
