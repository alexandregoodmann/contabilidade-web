import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Constants } from '../../Constants';
import { PlanilhaService } from '../../services/planilha.service';

@Component({
  selector: 'app-nav-ano-mes',
  templateUrl: './nav-ano-mes.component.html',
  styleUrls: ['./nav-ano-mes.component.scss']
})
export class NavAnoMesComponent implements OnInit {

  group: FormGroup;
  anos: Map<number, Array<string>>;
  meses: string[];

  constructor(
    private planilhaService: PlanilhaService,
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    this.group = this.fb.group({
      ano: [null],
      mes: [null]
    });
    this.planilhaService.selectObservable.subscribe(data => {
      this.anos = data;
      this.planilhaDoMes();
    });
  }

  getMeses() {
    this.anos.forEach((value, key) => {
      if (this.group.get('ano').value == key) {
        this.meses = value;
      }
    });
  }

  setMesSelecionado() {
    let mes = Constants.listaMeses.indexOf(this.group.get('mes').value);
    this.planilhaService.getPlanilhaMes(this.group.get('ano').value, mes + 1).subscribe(data => {
      console.log(data);
    });
  }

  planilhaDoMes() {
    let hoje = new Date();
    let ano = hoje.getFullYear();
    let mes = Constants.listaMeses[hoje.getMonth()];
    if (this.anos.has(ano)) {
      this.group.get('ano').setValue(ano);
      this.getMeses();
      this.anos.get(hoje.getFullYear()).forEach(m => {
        if (m == mes) {
          this.group.get('mes').setValue(mes);
        }
      });
    }
  }

}
