import { registerLocaleData } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import localePt from '@angular/common/locales/pt';
import { LOCALE_ID, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule, MatNativeDateModule } from '@angular/material';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatBadgeModule } from '@angular/material/badge';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatChipsModule } from '@angular/material/chips';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatToolbarModule } from '@angular/material/toolbar';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Routes } from '@angular/router';
import { CurrencyMaskConfig, CurrencyMaskModule, CURRENCY_MASK_CONFIG } from "ng2-currency-mask";
import { AppComponent } from './app.component';
import { BancoComponent } from './banco/banco.component';
import { CargaComponent } from './carga/carga.component';
import { CategoriaComponent } from './categoria/categoria.component';
import { ContaComponent } from './conta/conta.component';
import { ExtratoComponent } from './extrato/extrato.component';
import { LancamentoComponent } from './lancamento/lancamento.component';
import { PrincipalComponent } from './principal/principal.component';
import { SaldosComponent } from './saldos/saldos.component';
import { BotaoMenuComponent } from './shared/components/botao-menu/botao-menu.component';
import { ProgressBarComponent } from './shared/components/progress-bar/progress-bar.component';
import { TopBarComponent } from './shared/components/top-bar/top-bar.component';
import { InterceptorService } from './shared/services/interceptor.service';

registerLocaleData(localePt, 'pt-BR');

export const CustomCurrencyMaskConfig: CurrencyMaskConfig = {
  align: "left",
  allowNegative: false,
  decimal: ",",
  precision: 2,
  prefix: "R$ ",
  suffix: "",
  thousands: "."
};

const routes: Routes = [
  {
    path: 'banco',
    component: BancoComponent
  },
  {
    path: 'categoria',
    component: CategoriaComponent
  },
  {
    path: 'conta',
    component: ContaComponent
  },
  {
    path: 'lancamento',
    component: LancamentoComponent,
  },
  {
    path: 'extrato',
    component: ExtratoComponent
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
    SaldosComponent,
    ProgressBarComponent,
    CategoriaComponent,
    ContaComponent,
    ExtratoComponent,
    CargaComponent,
    BancoComponent,
  ],
  imports: [
    RouterModule.forRoot(routes, { useHash: true }),
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    CurrencyMaskModule,
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
    MatSnackBarModule,
    MatAutocompleteModule,
    MatRadioModule,
    MatBadgeModule,
    MatChipsModule,
    MatProgressBarModule,
    MatMenuModule,
    MatToolbarModule
  ],
  providers: [
    { provide: LOCALE_ID, useValue: 'pt-BR' },
    { provide: MAT_DATE_LOCALE, useValue: 'pt-BR' },
    { provide: CURRENCY_MASK_CONFIG, useValue: CustomCurrencyMaskConfig },
    { provide: HTTP_INTERCEPTORS, useClass: InterceptorService, multi: true }
  ],

  bootstrap: [AppComponent]
})
export class AppModule {
}
