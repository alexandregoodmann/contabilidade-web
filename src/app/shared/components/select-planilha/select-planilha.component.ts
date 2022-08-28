import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Planilha } from '../../model/planilha';
import { PlanilhasAno } from '../../model/PlanilhasAno';
import { PlanilhaService } from '../../services/planilha.service';

@Component({
  selector: 'app-select-planilha',
  templateUrl: './select-planilha.component.html',
  styleUrls: ['./select-planilha.component.scss']
})
export class SelectPlanilhaComponent implements OnInit {

  group: FormGroup;
  planilhasAno: PlanilhasAno[];
  planilhaSelecionada: Planilha;
  expanded = false;

  constructor(
    private planilhaService: PlanilhaService,
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    this.group = this.fb.group({
      ano: [null],
      mes: [null]
    });

    this.planilhaService.planilhasAno.subscribe(data => {
      this.planilhasAno = data;
    });

    this.planilhaService.planilhaSelecionada.subscribe(data => {
      this.planilhaSelecionada = data;
      this.group.get('ano').setValue(this.planilhaSelecionada.ano);
      this.group.get('mes').setValue(this.planilhaSelecionada);
    });
  }

  get meses() {
    let ret;
    this.planilhasAno.forEach(a => {
      if (a.ano == this.group.get('ano').value) {
        ret = a.planilhas;
      }
    });
    return ret;
  }

  setPlanilhaMes(mes) {
    this.planilhaService.setPlanilhaSelecionada(mes);
    this.expanded = false;
  }

}
