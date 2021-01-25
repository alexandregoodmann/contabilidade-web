import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Conta } from 'src/app/shared/model/conta';
import { Lancamento } from 'src/app/shared/model/lancamento';
import { CategoriaService } from 'src/app/shared/services/categoria.service';
import { ContaService } from 'src/app/shared/services/conta.service';


@Component({
  selector: 'app-lancamento',
  templateUrl: './lancamento.component.html',
  styleUrls: ['./lancamento.component.css']
})
export class LancamentoComponent implements OnInit {

  group: FormGroup;
  model: Lancamento;
  contas;
  categorias;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private contaService: ContaService,
    private categoriaService: CategoriaService,
  ) {
  }

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

  }

  salvar() {
    console.log(this.model);
    //this.router.navigateByUrl('/');
  }

  setConta(e) {
    console.log(e);
  }

}