import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar, getMatIconNoHttpProviderError } from '@angular/material';
import { Banco } from 'src/app/shared/model/banco';
import { BasicCrudService } from 'src/app/shared/services/basic-crud.service';

@Component({
  selector: 'app-banco',
  templateUrl: './banco.component.html',
  styleUrls: ['./banco.component.css']
})
export class BancoComponent implements OnInit {

  group: FormGroup;
  bancos: Array<Banco>;

  constructor(
    private fb: FormBuilder,
    private crudService: BasicCrudService,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit() {
    this.crudService.setUrl('bancos');
    this.buildGroup();
    this.findAll();
  }

  private buildGroup() {
    this.group = this.fb.group({
      id: [null],
      banco: [null, [Validators.required]]
    });
  }

  addBanco() {
    this.create(this.group.value);
  }

  create(banco: Banco) {
    this.crudService.create<Banco>(banco).subscribe(data => {
    }, (err) => { }, () => {
      this.buildGroup();
      this.findAll();
    });
  }

  delete(banco: Banco) {
    this.crudService.delete(banco.id).subscribe(data => {
    }, (err) => { }, () => {
      this.findAll();
      this.openSnackBar('Banco excluído', 'Desfazer', banco);
    });
  }

  findAll() {
    this.crudService.findAll<Banco>().subscribe(data => {
      this.bancos = data as unknown as Banco[];
    });
  }

  openSnackBar(message: string, action: string, banco: Banco) {
    this.snackBar.open(message, action, { duration: 3000 }).onAction().subscribe(action => {
      this.create(banco);
    });
  }

}
