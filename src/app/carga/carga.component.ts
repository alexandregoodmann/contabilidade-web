import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatChip } from '@angular/material';
import { Conta } from '../shared/model/conta';
import { ContaService } from '../shared/services/conta.service';
import { LancamentoService } from '../shared/services/lancamento.service';

@Component({
  selector: 'app-carga',
  templateUrl: './carga.component.html',
  styleUrls: ['./carga.component.css']
})
export class CargaComponent implements OnInit {

  group: FormGroup;
  formData = new FormData();
  contas: Array<Conta>;

  constructor(
    private fb: FormBuilder,
    private contaService: ContaService,
    private lancamentoService: LancamentoService
  ) { }

  ngOnInit() {
    this.contaService.findAll().subscribe(data => {
      this.contas = data as unknown as Array<Conta>;
    });

    this.group = this.fb.group({
      conta: [null, [Validators.required]],
      arquivo: [null, [Validators.required]]
    });
  }

  fileChange(event) {
    let fileList: FileList = event.target.files;
    this.group.get('arquivo').setValue(fileList[0]);
    this.formData.append("thumbnail", fileList[0]);
  }

  enviar() {
    let json = new CargaJson();
    json.idConta = this.group.get('conta').value;
    json.formData = this.formData;

    this.lancamentoService.carga(json).subscribe(d => {
      console.log(d);
    });
  }

  setConta(chip: MatChip) {
    chip.toggleSelected();
    this.group.get('conta').setValue(chip.value);
  }

}

export class CargaJson {
  idConta: string;
  formData: FormData;
}