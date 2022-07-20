import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatChip, MatSnackBar } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoriaService } from 'src/app/shared/services/categoria.service';
import { ContaService } from 'src/app/shared/services/conta.service';
import { LancamentoService } from 'src/app/shared/services/lancamento.service';
import { environment } from 'src/environments/environment';
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

  constructor(
    private fb: FormBuilder,
    private contaService: ContaService,
    private categoriaService: CategoriaService,
    private lancamentoService: LancamentoService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private snackBar: MatSnackBar
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
      fixo: [null],
      concluido: [null]
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
          this.group.get('concluido').setValue(lancamento.concluido);
          //this.group.get('valor').setValue(lancamento.valor < 0 ? lancamento.valor * -1 : lancamento.valor);
        });
      }
    });
  }

  salvar() {

    let model = this.group.value;
    model.categoria = this.categorias.filter(o => o.id == model.categoria)[0];
    model.conta = this.contas.filter(o => o.id == model.conta)[0];

    if (this.lancamento && this.lancamento.id) {
      this.lancamento.valor = model.valor;
      this.lancamento.categoria = model.categoria;
      this.lancamento.conta = model.conta;
      this.lancamento.concluido = model.concluido;
      this.lancamentoService.update(this.lancamento).subscribe(() => { }, () => { }, () => {
        this.router.navigate(['/planilha-detalhe'], { queryParams: this.lancamento.planilha });
      });
    } else {
      this.lancamentoService.create(model).subscribe(() => { }, () => { }, () => {
        this.snackBar.open('Lançamanto adicionado', null, { duration: environment.tempoSnackBar });
      });
    }

  }

  apagar() {
    this.lancamentoService.delete(this.lancamento.id).subscribe(() => { }, () => { }, () => {
      this.snackBar.open('Lançamento apagado', null, { duration: environment.tempoSnackBar });
      this.router.navigate(['/planilha-detalhe'], { queryParams: this.lancamento.planilha });
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

}