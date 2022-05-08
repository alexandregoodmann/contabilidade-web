import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatChip } from '@angular/material';
import { Banco } from 'src/app/shared/model/banco';
import { BancoService } from 'src/app/shared/services/banco.service';
import { ContaService } from 'src/app/shared/services/conta.service';

@Component({
  selector: 'app-conta',
  templateUrl: './conta.component.html',
  styleUrls: ['./conta.component.css']
})
export class ContaComponent implements OnInit {

  group: FormGroup;
  bancos;
  contas;

  constructor(
    private fb: FormBuilder,
    private bancoService: BancoService,
    private contaService: ContaService,
  ) { }

  ngOnInit() {

    //busca todos os bancos
    this.bancoService.findAll().subscribe(data => {
      this.bancos = data as unknown as Array<Banco>;
    });

    this.findAll();

    //cria group
    this.group = this.fb.group({
      descricao: [null, [Validators.required]],
      label: [null, [Validators.required]],
      banco: [null, [Validators.required]],
      corLabel: [null, [Validators.required]]
    });

  }

  add() {
    this.contaService.create(this.group.value).subscribe(() => { }, () => { }, () => { this.findAll(); });
  }

  delete(item){
    this.contaService.delete(item.id).subscribe(() => { }, () => { }, () => { this.findAll(); });
  }

  setBanco(chip: MatChip) {
    chip.toggleSelected();
    this.group.get('banco').setValue(chip.value);
  }

  findAll() {
    this.contaService.findAll().subscribe(data => {
      this.contas = data;
    });
  }
}
