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
  displayedColumns: string[] = ['banco', 'descricao'];

  constructor(
    private fb: FormBuilder,
    private contaService: ContaService,
  ) { }

  ngOnInit() {

    this.findAll();

    //cria group
    this.group = this.fb.group({
      banco: [null, [Validators.required]],
      descricao: [null, [Validators.required]]
    });

  }

  salvar() {
    if (this.conta == undefined) {
      this.contaService.create(this.group.value).subscribe(() => { }, () => { }, () => { this.findAll(); });
    } else {
      let model = this.group.value;
      model.id = this.conta.id;
      this.contaService.update(this.group.value).subscribe(() => { }, () => { }, () => {
        this.conta = undefined;
        this.group.reset();
        this.findAll();
      });
    }
  }

  editar(obj) {
    this.conta = obj;
    this.group.patchValue(obj);
  }

  apagar() {
    this.contaService.delete(this.conta.id).subscribe(() => { }, () => { }, () => {
      this.conta = undefined;
      this.group.reset();
      this.findAll();
    });
  }

  findAll() {
    this.contaService.findAll().subscribe(data => {
      this.contas = data;
    });
  }
}
