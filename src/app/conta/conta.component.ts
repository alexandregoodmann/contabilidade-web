import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatChip } from '@angular/material';
import { ContaService } from 'src/app/shared/services/conta.service';

@Component({
  selector: 'app-conta',
  templateUrl: './conta.component.html',
  styleUrls: ['./conta.component.css']
})
export class ContaComponent implements OnInit {

  group: FormGroup;
  conta;
  contas;
  cargas = cargasArquivo;
  tipos = tiposConta;
  displayedColumns: string[] = ['banco', 'descricao', 'carga', 'delete'];

  constructor(
    private fb: FormBuilder,
    private contaService: ContaService,
  ) { }

  ngOnInit() {
    this.findAll();
    //cria group
    this.group = this.fb.group({
      banco: [null, [Validators.required]],
      descricao: [null, [Validators.required]],
      tipo: [null, [Validators.required]],
      carga: [null]
    });

  }

  setTipo(chip: MatChip) {
    chip.toggleSelected();
    this.group.get('tipo').setValue(chip.value);
  }

  setCarga(chip: MatChip) {
    chip.toggleSelected();
    this.group.get('carga').setValue(chip.value);
  }

  salvar() {
    if (this.conta == undefined) {
      let conta = this.group.value;
      if (conta.carga != undefined)
        conta.carga = (conta.carga as string).toUpperCase();
      this.contaService.create(this.group.value).subscribe(() => { }, () => { }, () => { this.findAll(); });
    } else {

      let model = this.group.value;
      model.id = this.conta.id;

      if (model.carga != undefined)
        model.carga = (model.carga as string).toUpperCase();

      this.contaService.update(this.group.value).subscribe(() => { }, () => { }, () => {
        this.conta = undefined;
        this.group.reset();
        this.findAll();
      });
    }
  }

  edit(obj) {
    this.conta = obj;
    this.group.patchValue(obj);
  }

  delete(item) {
    this.contaService.delete(item.id).subscribe(() => { }, () => { }, () => {
      this.group.reset();
      this.conta = undefined;
      this.findAll();
    });
  }

  findAll() {
    this.contaService.findAll().subscribe(data => {
      this.contas = data;
    });
  }
}

export const tiposConta = [
  { tipo: "CC", descricao: "Conta corrente" },
  { tipo: "CARTAO", descricao: "Cartão de crédito" },
  { tipo: "CARTEIRA", descricao: "Carteira de dinheiro" },
  { tipo: "REFEICAO", descricao: "Vale refeição" },
  { tipo: "ALIMENTACAO", descricao: "Vale alimentação" },
];

export const cargasArquivo = [
  { arquivo: "BRADESCO", descricao: "Bradesco" },
  { arquivo: "C6", descricao: "Cartão C6" }
];