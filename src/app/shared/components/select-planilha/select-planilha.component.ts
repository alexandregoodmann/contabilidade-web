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
  planilhaAtual: Planilha;

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

    this.planilhaService.planilhaAtual.subscribe(data => {
      this.planilhaAtual = data;
      console.log(this.planilhaAtual);
      
      this.group.get('ano').setValue(this.planilhaAtual.ano);
      this.group.get('mes').setValue(this.planilhaAtual.descricao);
    });
  }

  get meses() {
    let ano = this.group.get('ano').value;
    let planilhas: Planilha[];
    this.planilhasAno.forEach(obj => {
      if (obj.ano == ano) {
        planilhas = obj.planilhas;
      }
    });
    return planilhas;
  }

  onChange(e){
    this.planilhaService.setPlanilhaSelecionada(e);
  }
}
