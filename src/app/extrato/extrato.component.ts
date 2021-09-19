import { Component, OnInit } from '@angular/core';
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

  constructor(
    private lancamentoService: LancamentoService,
    private router: Router
  ) { }

  ngOnInit() {

    this.mobile = this.isMobile();

    this.lancamentoService.findAll().subscribe(data => {
      this.lancamentos = data as unknown as Lancamento[];
      console.log(this.lancamentos);
      
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

}
