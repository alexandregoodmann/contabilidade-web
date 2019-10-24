import { NgModule } from '@angular/core';
import { MatInputModule, MatNativeDateModule } from '@angular/material';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BotaoMenuComponent } from './botao-menu/botao-menu.component';
import { ConfiguracaoComponent } from './configuracao/configuracao.component';
import { LancamentoRapidoComponent } from './lancamento-rapido/lancamento-rapido.component';
import { LancamentoComponent } from './lancamento/lancamento.component';
import { ListaLancamentoComponent } from './lista-lancamento/lista-lancamento.component';
import { PrincipalComponent } from './principal/principal.component';
import { TopBarComponent } from './top-bar/top-bar.component';

@NgModule({
  declarations: [
    AppComponent,
    PrincipalComponent,
    LancamentoComponent,
    TopBarComponent,
    BotaoMenuComponent,
    ConfiguracaoComponent,
    LancamentoRapidoComponent,
    ListaLancamentoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
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
    MatTableModule,
    MatPaginatorModule
    //MATERIAL
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
