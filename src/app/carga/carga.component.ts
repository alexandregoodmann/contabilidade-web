import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Conta } from '../shared/model/conta';
import { CargaService } from '../shared/services/carga.service';
import { ContaService } from '../shared/services/conta.service';

@Component({
  selector: 'app-carga',
  templateUrl: './carga.component.html',
  styleUrls: ['./carga.component.css']
})
export class CargaComponent implements OnInit {

  group: FormGroup;

  constructor(
    private fb: FormBuilder,
    private cargaService: CargaService,
    private contaService: ContaService
  ) { }

  ngOnInit() {
    this.group = this.fb.group({
      linhas: [null, [Validators.required]],
      conta: [null, [Validators.required]],
    });

    this.contaService.findAll().subscribe((data: Conta) => {
      /*
      data.forEach(e => {
        this.chipsContas.push({ key: e.id, label: e.conta, value: e });
      });*/
    });
  }

  enviar() {
    let linhas: string[] = this.group.get('linhas').value.split("\n");
    let json = new CargaJson();
    json.idConta = this.group.get('conta').value.id;
    linhas.forEach(l => {
      json.linhas.push(l);
    });

    this.cargaService.cargaC6(json).subscribe(d => {
      console.log('resposta', d);
    });
  }

  setConta(conta) {
    this.group.get('conta').setValue(conta.value);
  }

}

export class CargaJson {
  idConta: string;
  linhas: string[] = [];
}