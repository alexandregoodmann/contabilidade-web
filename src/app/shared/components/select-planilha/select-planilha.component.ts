import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Planilha } from '../../model/planilha';
import { PlanilhaService } from '../../services/planilha.service';

@Component({
  selector: 'app-select-planilha',
  templateUrl: './select-planilha.component.html',
  styleUrls: ['./select-planilha.component.scss']
})
export class SelectPlanilhaComponent implements OnInit {

  group: FormGroup;
  anos: Map<number, Array<string>> = new Map<number, Array<string>>();
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

    this.planilhaService.planilhasDoAno.subscribe(data => {
      this.anos = data;
    });

    this.planilhaService.planilhaAtual.subscribe(data => {
      this.planilhaAtual = data;
      this.group.get('ano').setValue(this.planilhaAtual.ano);
      this.group.get('mes').setValue(this.planilhaAtual.descricao);
    });
  }

  get meses() {
    let ret: string[];
    this.anos.forEach((value, key) => {
      if (key == this.group.get('ano').value) {
        ret = value;
      }
    });
    return ret;
  }

  onChange(mes: string) {
    console.log(mes);
    this.anos.forEach((value, key) => {
      if (key == this.group.get('ano').value) {
        
      }
    });
  }

}
