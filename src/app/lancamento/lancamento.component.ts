import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { ActivatedRoute } from '@angular/router';
import { CategoriaService } from 'src/app/shared/services/categoria.service';
import { ContaService } from 'src/app/shared/services/conta.service';
import { LancamentoService } from 'src/app/shared/services/lancamento.service';
import { ChipsObject } from '../shared/components/chips/chips.component';
import { Lancamento } from '../shared/model/lancamento';

@Component({
  selector: 'app-lancamento',
  templateUrl: './lancamento.component.html',
  styleUrls: ['./lancamento.component.scss']
})
export class LancamentoComponent implements OnInit {

  lancamento: Lancamento;
  group: FormGroup;
  chipsContas: ChipsObject[] = [];
  chipsCategorias: ChipsObject[] = [];
  tipoLancamento: ChipsObject[] = [{ key: 1, label: 'Entrada' }, { key: -1, label: 'Saída' }]

  constructor(
    private fb: FormBuilder,
    private contaService: ContaService,
    private categoriaService: CategoriaService,
    private lancamentoService: LancamentoService,
    private snackBar: MatSnackBar,
    private router: ActivatedRoute,
  ) {
  }

  ngOnInit(): void {

    this.contaService.findAll().subscribe(data => {
      data.forEach(e => {
        this.chipsContas.push({ key: e.id, label: e.conta, value: e });
      });
    });

    this.categoriaService.findAll().subscribe(data => {
      data.forEach(e => {
        this.chipsCategorias.push({ key: e.id, label: e.categoria, value: e });
      });
    });

    this.group = this.fb.group({
      conta: [null, [Validators.required]],
      categoria: [null, [Validators.required]],
      data: [null, [Validators.required]],
      descricao: [null, [Validators.required]],
      tipo: [null, [Validators.required]],
      valor: [null, [Validators.required]]
    });

    this.group.get('data').setValue(new Date());

    this.router.queryParamMap.subscribe(param => {
      if (param.get('id') != null) {
        this.lancamentoService.findById(param.get('id')).subscribe(lancamento => {

          this.lancamento = lancamento;

          console.log(this.lancamento);
          

          this.group.patchValue(lancamento);
          this.group.get('data').setValue(new Date(lancamento.data));

          //Parse Conta
          if (this.group.get('conta').value != null) {
            this.chipsContas.forEach(i => {
              if (i.key == lancamento.conta.id) {
                i.selected = true;
              }
            });
            this.setConta(lancamento.conta);
          }

          //Parse Categoria
          if (this.group.get('categoria').value != null) {
            this.chipsCategorias.forEach(i => {
              if (i.key == lancamento.categoria.id) {
                i.selected = true;
              }
            });
            this.setCategoria(lancamento.categoria);
          }

          //Parse Tipo
          let tipo = this.lancamento.valor > 0 ? 1 : -1;
          this.group.get('tipo').setValue(tipo);
          this.tipoLancamento.forEach(i => {
            i.selected = (i.key == tipo ? true : false);
          });

        });
      }
    });

  }

  setConta(conta) {
    this.group.get('conta').setValue(conta.value);
  }

  setCategoria(categoria) {
    this.group.get('categoria').setValue(categoria.value);
  }

  setTipoLancamento(tipo) {
    this.group.get('tipo').setValue(tipo.key);
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

}