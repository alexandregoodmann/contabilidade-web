import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Planilha } from '../shared/model/planilha';
import { PlanilhaService } from '../shared/services/planilha.service';

@Component({
  selector: 'app-planilha',
  templateUrl: './planilha.component.html',
  styleUrls: ['./planilha.component.scss']
})
export class PlanilhaComponent implements OnInit {

  displayedColumns: string[] = ['descricao', 'ano'];
  group: FormGroup;
  dataSource;
  meses: Map<number, string> = new Map<number, string>([
    [1, 'Janeiro'],
    [2, 'Fevereiro'],
    [3, 'Março'],
    [4, 'Abril'],
    [5, 'Maio'],
    [6, 'Junho'],
    [7, 'Julho'],
    [8, 'Agosto'],
    [9, 'Setembro'],
    [10, 'Outubro'],
    [11, 'Novembro'],
    [12, 'Dezembro']
  ]);

  constructor(
    private fb: FormBuilder,
    private planilhaService: PlanilhaService,
    private router: Router
  ) { }

  ngOnInit() {

    this.group = this.fb.group({
      mes: [null, [Validators.required]],
      ano: [null, [Validators.required]]
    });

    this.findAll();
  }

  salvar() {
    let model: Planilha = this.group.value;
    model.descricao = this.meses.get(model.mes);
    this.planilhaService.create(model).subscribe(() => { }, () => { }, () => {
      this.findAll();
    });
  }

  findAll() {
    this.planilhaService.findAll().subscribe(data => {
      this.dataSource = data as unknown as Array<Planilha>;
    });
  }

  editar(row) {
    this.router.navigate(['/planilha-detalhe'], { queryParams: row });
  }
}