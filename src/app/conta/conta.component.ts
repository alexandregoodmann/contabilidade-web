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
  cargas = ['BRADESCO', 'C6']
  displayedColumns: string[] = ['banco', 'descricao', 'carga','delete'];

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
      carga: [null]
    });

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
    console.log(this.conta);

    if (this.conta.carga != undefined)
      this.group.get('carga').setValue(this.conta.carga);
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
