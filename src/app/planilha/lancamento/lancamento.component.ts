import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Lancamento } from 'src/app/shared/model/lancamento';


@Component({
  selector: 'app-lancamento',
  templateUrl: './lancamento.component.html',
  styleUrls: ['./lancamento.component.css']
})
export class LancamentoComponent implements OnInit {

  param;
  model: Lancamento;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
  ) {
    this.route.params.subscribe(params => this.param = params);
  }

  ngOnInit(): void {

    if (this.param.categoria != 0) {
      this.preparar();
      console.log(this.model);
    } else {
      this.model = new Lancamento();
    }
  }

  salvar() {
    console.log(this.model);

    //this.router.navigateByUrl('/');
  }

  private preparar() {
    let l = new Lancamento();
    l.categoria = this.param.categoria;
    this.model = l;
  }

}