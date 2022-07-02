import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Lancamento } from '../shared/model/lancamento';
import { Planilha } from '../shared/model/planilha';
import { PlanilhaService } from '../shared/services/planilha.service';

@Component({
  selector: 'app-planilha-detalhe',
  templateUrl: './planilha-detalhe.component.html',
  styleUrls: ['./planilha-detalhe.component.scss']
})
export class PlanilhaDetalheComponent implements OnInit {

  displayedColumns: string[] = ['data', 'conta', 'categoria', 'descricao', 'valor'];
  planilha: Planilha;
  lancamentos: Lancamento[];
  total: number = 0;

  constructor(
    private activatedRoute: ActivatedRoute,
    private planilhaService: PlanilhaService,
    private router: Router
  ) { }

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe(param => {
      this.planilha = param as Planilha;
      this.planilhaService.getLancamento(param.id).subscribe(data => {
        this.lancamentos = data as Array<Lancamento>;
        this.lancamentos.forEach(e => {
          this.total = this.total + e.valor;
        })
      });
    });
  }

  editar(obj) {
    this.router.navigate(['/lancamento'],
      { queryParams: obj });
  }

}
