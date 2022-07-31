import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Constants } from '../shared/Constants';
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

  constructor(
    private fb: FormBuilder,
    private planilhaService: PlanilhaService,
    private router: Router
  ) { }

  ngOnInit() {

    this.group = this.fb.group({
      mes: [null],
      ano: [null]
    });

    this.findAll();
  }

  salvar() {
    let model: Planilha = this.group.value;
    model.descricao = Constants.meses.get(model.mes);
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
