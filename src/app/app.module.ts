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
import { MatDividerModule } from '@angular/material/divider';
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
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { CargaComponent } from './carga/carga.component';
import { CategoriaComponent } from './categoria/categoria.component';
import { ContaComponent } from './conta/conta.component';
import { ExtratoComponent } from './extrato/extrato.component';
import { LancamentoComponent } from './lancamento/lancamento.component';
import { PlanilhaComponent } from './planilha/planilha.component';
import { PrincipalComponent } from './principal/principal.component';
import { SaldosComponent } from './saldos/saldos.component';
import { LinkPlanilhaComponent } from './shared/components/link-planilha/link-planilha.component';
import { ProgressBarComponent } from './shared/components/progress-bar/progress-bar.component';
import { SelectPlanilhaComponent } from './shared/components/select-planilha/select-planilha.component';
import { TopBarComponent } from './shared/components/top-bar/top-bar.component';
import { InterceptorService } from './shared/services/interceptor.service';
import { NgxCurrencyModule } from "ngx-currency";

registerLocaleData(localePt, 'pt-BR');

const routes: Routes = [
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
    path: 'carga',
    component: CargaComponent
  },
  {
    path: 'planilha',
    component: PlanilhaComponent
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
    SaldosComponent,
    ProgressBarComponent,
    CategoriaComponent,
    ContaComponent,
    CargaComponent,
    PlanilhaComponent,
    ExtratoComponent,
    LinkPlanilhaComponent,
    SelectPlanilhaComponent
  ],
  imports: [
    RouterModule.forRoot(routes, { useHash: true }),
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgxCurrencyModule,
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
    MatToolbarModule,
    MatSlideToggleModule,
    MatTableModule,
    MatSortModule,
    MatExpansionModule,
    MatDividerModule,
    MatListModule
  ],
  providers: [
    { provide: LOCALE_ID, useValue: 'pt-BR' },
    { provide: MAT_DATE_LOCALE, useValue: 'pt-BR' },
    { provide: HTTP_INTERCEPTORS, useClass: InterceptorService, multi: true }
  ],

  bootstrap: [AppComponent]
})
export class AppModule {
}
