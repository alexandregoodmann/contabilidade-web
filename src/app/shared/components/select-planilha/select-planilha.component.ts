import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { PlanilhaService } from '../../services/planilha.service';

@Component({
  selector: 'app-select-planilha',
  templateUrl: './select-planilha.componenet.html',
  styleUrls: ['./select-planilha.component.scss']
})
export class SelectPlanilhaComponent implements OnInit {

  group: FormGroup;
  anos: Map<number, Array<string>> = new Map<number, Array<string>>();
  meses;

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

      this.group.get('ano').setValue(data.ano);
      this.meses = this.anos.get(data.ano);

      console.log(this.anos);

      console.log(this.meses);

      this.group.get('mes').setValue(data.descricao);
    }, (err) => { }, () => {

    });

  }

}
