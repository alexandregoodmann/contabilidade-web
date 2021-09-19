import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatChip, MatChipInputEvent, MatSnackBar } from '@angular/material';
import { ActivatedRoute } from '@angular/router';
import { CategoriaService } from 'src/app/shared/services/categoria.service';
import { ContaService } from 'src/app/shared/services/conta.service';
import { LancamentoService } from 'src/app/shared/services/lancamento.service';
import { ChipsObject } from '../shared/components/chips/chips.component';
import { Conta } from '../shared/model/conta';
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
      valor: [null, [Validators.required]]
    });

    this.group.get('data').setValue(new Date());

    this.router.queryParamMap.subscribe(param => {
      if (param.get('id') != null) {
        this.lancamentoService.findById(param.get('id')).subscribe(lancamento => {
          this.lancamento = lancamento;
          console.log('lancamento', lancamento);
          this.group.patchValue(lancamento);
          this.group.get('data').setValue(new Date(lancamento.data));
          this.group.get('conta').setValue(lancamento.conta);
          this.group.get('categoria').setValue(lancamento.categoria);
          console.log('group', this.group.value);
        });
      }
    });

    
  }

  salvar() {
    let model = this.group.value;
    if (this.lancamento && this.lancamento.id) {
      model.id = this.lancamento.id;
      this.lancamentoService.update(model).subscribe(() => {
      }, () => { }, () => {
        this.snackBar.open('Atualizado', '', {
          duration: 2000,
          horizontalPosition: 'start'
        });
      });
    } else {
      model.valor = model.valor * model.tipo;
      this.lancamentoService.create(model).subscribe(() => {
      }, () => { }, () => {
        this.snackBar.open('Salvo', '', {
          duration: 2000,
          horizontalPosition: 'start'
        });
      });
    }

  }

  setConta(chip: MatChip) {
    chip.toggleSelected();
    this.group.get('conta').setValue(chip.value);
  }

  setCategoria(chip: MatChip) {
    chip.toggleSelected();
    this.group.get('categoria').setValue(chip.value);
  }

  get contaSelected(){
    if (this.lancamento && this.lancamento.conta){
      return this.group.get('conta').value == this.lancamento.conta;
    }
    return false;
  }
}