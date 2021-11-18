import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatChip } from '@angular/material';
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
  contas: Array<Conta>;

  constructor(
    private fb: FormBuilder,
    private cargaService: CargaService,
    private contaService: ContaService
  ) { }

  ngOnInit() {
    this.contaService.findAll().subscribe(data => {
      this.contas = data as unknown as Array<Conta>;
    });

    this.group = this.fb.group({
      linhas: [null, [Validators.required]],
      conta: [null, [Validators.required]],
    });
  }

  enviar() {
    let linhas: string[] = this.group.get('linhas').value.split("\n");
    let json = new CargaJson();
    json.idConta = this.group.get('conta').value;
    linhas.forEach(l => {
      json.linhas.push(l);
    });

    this.cargaService.carga(json).subscribe(d => {
      console.log('resposta', d);
    });
  }

  setConta(chip: MatChip) {
    chip.toggleSelected();
    this.group.get('conta').setValue(chip.value);
  }

}

export class CargaJson {
  idConta: string;
  linhas: string[] = [];
}