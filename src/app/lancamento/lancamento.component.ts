import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatChip } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoriaService } from 'src/app/shared/services/categoria.service';
import { ContaService } from 'src/app/shared/services/conta.service';
import { LancamentoService } from 'src/app/shared/services/lancamento.service';
import { Categoria } from '../shared/model/categoria';
import { Conta } from '../shared/model/conta';
import { Lancamento } from '../shared/model/lancamento';

@Component({
  selector: 'app-lancamento',
  templateUrl: './lancamento.component.html',
  styleUrls: ['./lancamento.component.scss']
})
export class LancamentoComponent implements OnInit {

  group: FormGroup;
  contas: Array<Conta>;
  categorias: Array<Categoria>;
  lancamento: Lancamento;
  tipos = [{ label: 'Entrada', value: 1 }, { label: 'Saída', value: -1 }];

  constructor(
    private fb: FormBuilder,
    private contaService: ContaService,
    private categoriaService: CategoriaService,
    private lancamentoService: LancamentoService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {

    this.contaService.findAll().subscribe(data => {
      this.contas = data as unknown as Array<Conta>;
    });

    this.categoriaService.findAll().subscribe(data => {
      this.categorias = data as unknown as Array<Categoria>;
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

    this.activatedRoute.queryParamMap.subscribe(param => {
      if (param.get('id') != null) {
        this.lancamentoService.findById(param.get('id')).subscribe(lancamento => {
          this.lancamento = lancamento;
          this.group.patchValue(lancamento);
          this.group.get('data').setValue(new Date(lancamento.data));
          this.group.get('conta').setValue(lancamento.conta.id);
          this.group.get('categoria').setValue(lancamento.categoria.id);
          this.group.get('tipo').setValue((lancamento.valor > 0) ? 1 : -1);
          this.group.get('valor').setValue(lancamento.valor < 0 ? lancamento.valor * -1 : lancamento.valor);
        });
      }
    });
  }

  salvar() {
    let model = this.group.value;
    model.valor = model.valor * model.tipo;
    model.categoria = this.categorias.filter(o => o.id == model.categoria)[0];
    model.conta = this.contas.filter(o => o.id == model.conta)[0];

    if (this.lancamento && this.lancamento.id) {
      this.lancamento.valor = model.valor;
      this.lancamento.categoria = model.categoria;
      this.lancamento.conta = model.conta;
      this.lancamentoService.update(this.lancamento).subscribe(() => { }, () => { }, () => {
        this.router.navigate(['/extrato']);
      });
    } else
      this.lancamentoService.create(model).subscribe(() => { });

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