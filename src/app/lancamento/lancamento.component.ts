import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-lancamento',
  templateUrl: './lancamento.component.html',
  styleUrls: ['./lancamento.component.css']
})
export class LancamentoComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  salvar() {
    this.router.navigateByUrl('/');
  }

}
