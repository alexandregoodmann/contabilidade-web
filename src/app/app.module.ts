import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
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
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { CadastrosComponent } from './cadastros/cadastros/cadastros.component';
import { CategoriaComponent } from './cadastros/categoria/categoria.component';
import { LancamentoRapidoComponent } from './planilha/lancamento-rapido/lancamento-rapido.component';
import { LancamentoComponent } from './planilha/lancamento/lancamento.component';
import { ListaLancamentoComponent } from './planilha/lista-lancamento/lista-lancamento.component';
import { SaldosComponent } from './planilha/saldos/saldos.component';
import { PrincipalComponent } from './principal/principal.component';
import { BotaoMenuComponent } from './shared/components/botao-menu/botao-menu.component';
import { ProgressBarComponent } from './shared/components/progress-bar/progress-bar.component';
import { TopBarComponent } from './shared/components/top-bar/top-bar.component';

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
    path: 'cadastros',
    component: CadastrosComponent
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
    CadastrosComponent,
    CategoriaComponent,
  ],
  imports: [
    RouterModule.forRoot(routes, { useHash: true }),
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
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
    MatExpansionModule,
    MatSnackBarModule
    //MATERIAL
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {


}
