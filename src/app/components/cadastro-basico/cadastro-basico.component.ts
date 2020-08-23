import { Component, OnInit } from '@angular/core';
import { Banco } from 'src/app/model/banco';
import { BasicCrudService } from 'src/app/services/basic-crud.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-cadastro-basico',
  templateUrl: './cadastro-basico.component.html',
  styleUrls: ['./cadastro-basico.component.css']
})
export class CadastroBasicoComponent implements OnInit {

  bancos;
  url = environment.url + '/bancos';
  model;

  constructor(private crud: BasicCrudService) { }

  ngOnInit() {
    this.findAll();
  }

  delete(id) {
    this.crud.delete(`${this.url}/${id}`).subscribe(() => { this.findAll() });
  }

  findAll() {
    this.crud.findAll<Banco>(this.url).subscribe(data => {
      this.bancos = data;
    });
  }

}
