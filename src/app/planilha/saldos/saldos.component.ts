import { Component, OnInit } from '@angular/core';
import { ContaService } from 'src/app/shared/services/conta.service';

@Component({
  selector: 'app-saldos',
  templateUrl: './saldos.component.html',
  styleUrls: ['./saldos.component.css']
})
export class SaldosComponent implements OnInit {

  panelOpenState = false;

  constructor(private contaService: ContaService) {
  }

  ngOnInit() {

    this.contaService.findAll().subscribe(data => {
      console.log(data);

    });

  }


}
