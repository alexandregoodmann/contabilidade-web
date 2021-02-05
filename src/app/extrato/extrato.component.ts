import { Component, OnInit } from '@angular/core';
import { Lancamento } from '../shared/model/lancamento';
import { LancamentoService } from '../shared/services/lancamento.service';

@Component({
  selector: 'app-extrato',
  templateUrl: './extrato.component.html',
  styleUrls: ['./extrato.component.css']
})
export class ExtratoComponent implements OnInit {

  lancamentos: Lancamento[];

  constructor(
    private lancamentoService: LancamentoService
  ) { }

  ngOnInit() {
    this.lancamentoService.findAll().subscribe(data => {
      this.lancamentos = data as unknown as Lancamento[];
    })
  }

}
