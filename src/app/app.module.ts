import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { MatInputModule, MatNativeDateModule } from '@angular/material';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { BotaoMenuComponent } from './botao-menu/botao-menu.component';
import { CadastroBasicoComponent } from './components/cadastro-basico/cadastro-basico.component';
import { LancamentoRapidoComponent } from './lancamento-rapido/lancamento-rapido.component';
import { LancamentoComponent } from './lancamento/lancamento.component';
import { ListaLancamentoComponent } from './lista-lancamento/lista-lancamento.component';
import { PrincipalComponent } from './principal/principal.component';
import { ProgressBarComponent } from './progress-bar/progress-bar.component';
import { SaldosComponent } from './saldos/saldos.component';
import { TopBarComponent } from './top-bar/top-bar.component';


const routes: Routes = [
  {
    path: 'principal',
    component: PrincipalComponent,
  },
  {
    path: 'saldos',
    component: SaldosComponent,
  },
  {
    path: 'lancamento',
    component: LancamentoComponent,
  },
  {
    path: 'lancamento-rapido',
    component: LancamentoRapidoComponent,
  },
  {
    path: 'lista-lancamento',
    component: ListaLancamentoComponent,
  },
  {
    path: 'cadastro-basico',
    component: CadastroBasicoComponent
  },
  {
    path: '',
    redirectTo: 'principal',
    pathMatch: 'full'
  },
  { path: '**', component: PrincipalComponent }
];


@NgModule({
  declarations: [
    AppComponent,
    PrincipalComponent,
    LancamentoComponent,
    TopBarComponent,
    BotaoMenuComponent,
    LancamentoRapidoComponent,
    ListaLancamentoComponent,
    SaldosComponent,
    ProgressBarComponent,
    CadastroBasicoComponent
  ],
  imports: [
    RouterModule.forRoot(routes, { useHash: true }),
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    //MATERIAL
    MatCardModule,
    MatGridListModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatButtonModule,
    MatIconModule,
    MatListModule,
    MatCardModule,
    MatCheckboxModule,
    MatPaginatorModule,
    MatExpansionModule
    //MATERIAL
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {


}
