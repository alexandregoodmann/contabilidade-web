import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
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

  displayedColumns: string[] = ['ano', 'descricao', 'acao'];
  group: FormGroup;
  dataSource;
  meses = Constants.listaMeses;

  constructor(
    private fb: FormBuilder,
    private planilhaService: PlanilhaService,
    private router: Router
  ) { }

  ngOnInit() {

    this.group = this.fb.group({
      ano: [null],
      descricao: [null]
    });

    this.findAll();
  }

  salvar() {
    let model: Planilha = this.group.value;
    model.mes = Constants.listaMeses.indexOf(model.descricao) + 1;
    this.planilhaService.create(model).subscribe(() => { }, () => { }, () => {
      this.findAll();
    });
  }

  findAll() {
    this.planilhaService.findAll().subscribe(data => {
      this.dataSource = data as unknown as Array<Planilha>;
    });
  }

  delete(row) {
    this.planilhaService.delete(row.id).subscribe(() => { }, () => { }, () => {
      this.findAll();
    });
  }

  edit(obj) {
    this.group.patchValue(obj);
  }
}
