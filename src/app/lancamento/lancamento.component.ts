import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { CategoriaService } from 'src/app/shared/services/categoria.service';
import { ContaService } from 'src/app/shared/services/conta.service';
import { LancamentoService } from 'src/app/shared/services/lancamento.service';

@Component({
  selector: 'app-lancamento',
  templateUrl: './lancamento.component.html',
  styleUrls: ['./lancamento.component.scss']
})
export class LancamentoComponent implements OnInit {

  group: FormGroup;
  chipsContas = [];
  chipsCategorias = [];

  constructor(
    private fb: FormBuilder,
    private contaService: ContaService,
    private categoriaService: CategoriaService,
    private lancamentoService: LancamentoService,
    private snackBar: MatSnackBar
  ) {
  }

  ngOnInit(): void {

    this.contaService.findAll().subscribe(data => {
      data.forEach(e => {
        this.chipsContas.push(e.conta);
      });
    });

    this.categoriaService.findAll().subscribe(data => {
      data.forEach(e => {
        this.chipsCategorias.push(e.categoria);
      })
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
    this.lancamentoService.create(model).subscribe(() => {
    }, () => { }, () => {
      this.snackBar.open('Salvo', '', {
        duration: 2000,
        horizontalPosition: 'start'
      });
    });
  }

  tipoLancamento(e) {
    console.log('no tipo papai', e);

  }

}