import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Categoria } from 'src/app/shared/model/categoria';
import { Conta } from 'src/app/shared/model/conta';
import { Lancamento } from 'src/app/shared/model/lancamento';
import { CategoriaService } from 'src/app/shared/services/categoria.service';
import { ContaService } from 'src/app/shared/services/conta.service';
import { LancamentoService } from 'src/app/shared/services/lancamento.service';


@Component({
  selector: 'app-lancamento',
  templateUrl: './lancamento.component.html',
  styleUrls: ['./lancamento.component.css']
})
export class LancamentoComponent implements OnInit {

  group: FormGroup;
  contas: Conta[];
  contaSelected: Conta;
  categorias: Categoria[];
  categoriaSelected: Categoria;

  constructor(
    private fb: FormBuilder,
    private contaService: ContaService,
    private categoriaService: CategoriaService,
    private lancamentoService: LancamentoService
  ) {
  }

  ngOnInit(): void {

    this.contaService.findAll().subscribe(data => {
      this.contas = data as unknown as Conta[];
    });

    this.categoriaService.findAll().subscribe(data => {
      this.categorias = data as unknown as Categoria[];
    });

    this.group = this.fb.group({
      conta: [null, [Validators.required]],
      categoria: [null, [Validators.required]],
      data: [null, [Validators.required]],
      descricao: [null, [Validators.required]],
      valor: [null, [Validators.required]]
    });

    this.group.get('data').setValue(new Date());
  }

  salvar() {
    let model = this.group.value;
    this.lancamentoService.create(model).subscribe(data => {
    }, (err) => { }, () => {
    });
  }

  setValues(controlName: string, obj: any) {
    this.group.get(controlName).setValue(obj);
    this.group.updateValueAndValidity();

    if (controlName === 'conta') {
      this.contaSelected = obj;
    }

    if (controlName === 'categoria') {
      this.categoriaSelected = obj;
    }
  }

}