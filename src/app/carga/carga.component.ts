import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatChip } from '@angular/material';
import { environment } from 'src/environments/environment';
import { Conta } from '../shared/model/conta';
import { ContaService } from '../shared/services/conta.service';
import { PlanilhaService } from '../shared/services/planilha.service';

@Component({
  selector: 'app-carga',
  templateUrl: './carga.component.html',
  styleUrls: ['./carga.component.scss']
})
export class CargaComponent implements OnInit {

  group: FormGroup;
  contas: Array<Conta> = [];
  planilhaSelecionada;
  fileName = '';
  file: File;

  constructor(
    private fb: FormBuilder,
    private contaService: ContaService,
    private planilhaService: PlanilhaService,
    private http: HttpClient
  ) { }

  ngOnInit() {

    this.planilhaService.planilhaSelecionada.subscribe(data => { this.planilhaSelecionada = data });

    this.contaService.findAll().subscribe(data => {
      this.contas = data;
    });

    this.group = this.fb.group({
      conta: [null, [Validators.required]],
      cargaArquivo: [null, [Validators.required]]
    });
  }

  setConta(chip: MatChip) {
    chip.toggleSelected();
    this.group.get('conta').setValue(chip.value);
  }

  onFileSelected(event) {
    this.file = event.target.files[0];
    this.fileName = this.file.name;
    this.group.get('cargaArquivo').setValue(this.fileName);
  }

  enviar(form) {
    if (this.file) {
      const formData = new FormData();
      let conta: Conta = this.group.get('conta').value;
      formData.append("idConta", conta.id.toString());
      formData.append("banco", conta.descricao.toUpperCase());
      formData.append("file", this.file);
      formData.append("idPlanilha", this.planilhaSelecionada.id);

      const upload$ = this.http.post(`${environment.url}/lancamentos/uploadFile`, formData);
      upload$.subscribe();

      this.fileName = '';
      this.file = undefined;
      form.reset();
    }
  }

}