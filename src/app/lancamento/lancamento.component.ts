import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatChip, MatSnackBar } from '@angular/material';
import { ActivatedRoute } from '@angular/router';
import { CategoriaService } from 'src/app/shared/services/categoria.service';
import { ContaService } from 'src/app/shared/services/conta.service';
import { LancamentoService } from 'src/app/shared/services/lancamento.service';
import { Lancamento } from '../shared/model/lancamento';

@Component({
  selector: 'app-lancamento',
  templateUrl: './lancamento.component.html',
  styleUrls: ['./lancamento.component.scss']
})
export class LancamentoComponent implements OnInit {

  group: FormGroup;
  contas;
  categorias;
  lancamento: Lancamento;
  tipos = [{ label: 'Entrada', value: 1 }, { label: 'Saída', value: -1 }];

  constructor(
    private fb: FormBuilder,
    private contaService: ContaService,
    private categoriaService: CategoriaService,
    private lancamentoService: LancamentoService,
    private snackBar: MatSnackBar,
    private router: ActivatedRoute,
  ) { }

  ngOnInit(): void {

    this.contaService.findAll().subscribe(data => {
      this.contas = data;
    });

    this.categoriaService.findAll().subscribe(data => {
      this.categorias = data;
    });

    this.group = this.fb.group({
      conta: [null, [Validators.required]],
      categoria: [null, [Validators.required]],
      data: [null, [Validators.required]],
      descricao: [null, [Validators.required]],
      valor: [null, [Validators.required]],
      tipo: [null, [Validators.required]]
    });

    this.group.get('data').setValue(new Date());

    this.router.queryParamMap.subscribe(param => {
      if (param.get('id') != null) {
        this.lancamentoService.findById(param.get('id')).subscribe(lancamento => {
          this.lancamento = lancamento;
          this.group.patchValue(lancamento);
          this.group.get('data').setValue(new Date(lancamento.data));
          this.group.get('conta').setValue(lancamento.conta);
          this.group.get('categoria').setValue(lancamento.categoria);
        });
      }
    });
  }

  salvar() {
    let model = this.group.value;
    model.valor = model.valor * model.tipo;
    this.lancamentoService.create(model).subscribe(() => {
    }, () => { }, () => {
      this.snackBar.open('Salvo', '', {
        duration: 2000,
        horizontalPosition: 'start'
      });
      console.log(this.group);
      
    });
  }

  setConta(chip: MatChip) {
    chip.toggleSelected();
    this.group.get('conta').setValue(chip.value);
  }

  setCategoria(chip: MatChip) {
    chip.toggleSelected();
    this.group.get('categoria').setValue(chip.value);
  }

  setTipo(chip: MatChip) {
    chip.toggleSelected();
    this.group.get('tipo').setValue(chip.value);
  }

}