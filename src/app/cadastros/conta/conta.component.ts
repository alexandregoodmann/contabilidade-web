import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { Conta } from 'src/app/shared/model/conta';
import { BasicCrudService } from 'src/app/shared/services/basic-crud.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-conta',
  templateUrl: './conta.component.html',
  styleUrls: ['./conta.component.css']
})
export class ContaComponent implements OnInit {

  private url = `${environment.url}/contas`;
  group: FormGroup;
  categorias: Array<Conta>;

  constructor(
    private fb: FormBuilder,
    private crudService: BasicCrudService<Conta>,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit() {
    this.buildGroup();
    this.findAll();

    this.crudService.url = `${environment.url}/bancos`;
    this.crudService.findAll().subscribe(data => {
      console.log(data);
    });
  }

  private buildGroup() {
    this.group = this.fb.group({
      id: [null],
      conta: [null, [Validators.required]],
      banco: [null, [Validators.required]]
    });
  }

  addConta() {
    this.crudService.url = this.url;
    this.create(this.group.value);
  }

  create(conta: Conta) {
    this.crudService.create(conta).subscribe(data => {
    }, (err) => { }, () => {
      this.buildGroup();
      this.findAll();
    });
  }

  delete(conta: Conta) {
    this.crudService.url = this.url;
    this.crudService.delete(conta.id).subscribe(data => {
    }, (err) => { }, () => {
      this.openSnackBar('Conta excluída', 'Desfazer', conta);
      this.findAll();
    });
  }

  findAll() {
    this.crudService.url = this.url;
    this.crudService.findAll().subscribe(data => {
      this.categorias = data as unknown as Conta[];
    });
  }

  openSnackBar(message: string, action: string, conta: Conta) {
    this.snackBar.open(message, action, { duration: 3000 }).onAction().subscribe(action => {
      this.create(conta);
    });
  }

}
