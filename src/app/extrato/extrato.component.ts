import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDatepicker } from '@angular/material';
import { Router } from '@angular/router';
import { Lancamento } from '../shared/model/lancamento';
import { LancamentoService } from '../shared/services/lancamento.service';

@Component({
  selector: 'app-extrato',
  templateUrl: './extrato.component.html',
  styleUrls: ['./extrato.component.css']
})
export class ExtratoComponent implements OnInit {

  lancamentos: Lancamento[];
  mobile: Boolean;
  meses = [
    { label: 'Janeiro', value: 1 },
    { label: 'Fevereiro', value: 2 },
    { label: 'Março', value: 3 },
    { label: 'Abril', value: 4 },
    { label: 'Maio', value: 5 },
    { label: 'Junho', value: 6 },
    { label: 'Julho', value: 7 },
    { label: 'Agosto', value: 8 },
    { label: 'Setembro', value: 9 },
    { label: 'Outubro', value: 10 },
    { label: 'Novembro', value: 11 },
    { label: 'Dezembro', value: 12 }
  ];

  constructor(
    private lancamentoService: LancamentoService,
    private router: Router
  ) { }

  ngOnInit() {
    this.mobile = this.isMobile();
    this.lancamentoService.findAll().subscribe(data => {
      this.lancamentos = data as unknown as Lancamento[];
    });
  }

  private isMobile() {
    var userAgent = navigator.userAgent.toLowerCase();
    if (userAgent.search(/(android|avantgo|blackberry|bolt|boost|cricket|docomo|fone|hiptop|mini|mobi|palm|phone|pie|tablet|up\.browser|up\.link|webos|wos)/i) != -1)
      return true;
  }

  editar(obj) {
    this.router.navigate(['/lancamento'],
      { queryParams: obj });
  }

  filtrar(item){
    console.log(item);
    
  }
}
