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
  fileToUpload: File | null = null;
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

  handleFileInput(files: FileList) {
    this.fileToUpload = files.item(0);
  }

  enviar() {
    let idConta = this.group.get('conta').value;
    this.lancamentoService.postFile(idConta, this.fileToUpload).subscribe(data => {
      // do something, if upload success
    }, error => {
      console.log('deu merda', error);
    });
  }

  setConta(chip: MatChip) {
    chip.toggleSelected();
    this.group.get('conta').setValue(chip.value);
  }

}
