import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Banco } from '../shared/model/banco';
import { BancoService } from '../shared/services/banco.service';

@Component({
  selector: 'app-banco',
  templateUrl: './banco.component.html',
  styleUrls: ['./banco.component.css']
})
export class BancoComponent implements OnInit {

  group: FormGroup;
  bancos;

  constructor(
    private fb: FormBuilder,
    private bancoService: BancoService
  ) { }

  ngOnInit() {
    this.findAll();
    this.group = this.fb.group({
      descricao: [null, [Validators.required]]
    });
  }

  private findAll() {
    this.bancoService.findAll().subscribe(data => {
      this.bancos = data;
    });
  }

  add() {
    this.bancoService.create(this.group.value).subscribe(() => { }, () => { }, () => {
      this.findAll();
    });
  }

  delete(obj) {
    this.bancoService.delete(obj.id).subscribe(() => { }, () => { }, () => {
      this.findAll();
    });
  }

}
