import { Component, OnInit } from '@angular/core';
import { Banco } from 'src/app/model/banco';
import { BasicCrudService } from 'src/app/services/basic-crud.service';

@Component({
  selector: 'app-cadastro-basico',
  templateUrl: './cadastro-basico.component.html',
  styleUrls: ['./cadastro-basico.component.css']
})
export class CadastroBasicoComponent implements OnInit {

  bancos: Banco[];

  constructor(private crud: BasicCrudService) { }

  createBanco() {
    const b = new Banco();
    b.banco = 'banco1';
    this.crud.create<Banco>('/bancos', b).subscribe(d => {
      console.log(d);
    });
  }

  ngOnInit() {
    this.createBanco();
  }

}
