import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { Categoria } from 'src/app/shared/model/categoria';
import { BasicCrudService } from 'src/app/shared/services/basic-crud.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-categoria',
  templateUrl: './categoria.component.html',
  styleUrls: ['./categoria.component.css']
})
export class CategoriaComponent implements OnInit {

  private url = `${environment.url}/categorias`;
  group: FormGroup;
  categorias: Array<Categoria>;

  constructor(
    private fb: FormBuilder,
    private crudService: BasicCrudService,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit() {
    this.buildGroup();
    this.findAll();
  }

  private buildGroup() {
    this.group = this.fb.group({
      id: [null],
      categoria: [null, [Validators.required]]
    });
  }

  addCategoria() {
    this.create(this.group.value);
  }

  create(categoria: Categoria) {
    this.crudService.create<Categoria>(this.url, categoria).subscribe(data => {
    }, (err) => { }, () => {
      this.buildGroup();
      this.findAll();
    });
  }

  delete(categoria: Categoria) {
    this.crudService.delete(this.url, categoria.id).subscribe(data => {
    }, (err) => { }, () => {
      this.openSnackBar('Categoria excluída', 'Desfazer', categoria);
      this.findAll();
    });
  }

  findAll() {
    this.crudService.findAll<Categoria>(this.url).subscribe(data => {
      this.categorias = data as unknown as Categoria[];
    });
  }

  openSnackBar(message: string, action: string, categoria: Categoria) {
    this.snackBar.open(message, action, { duration: 3000 }).onAction().subscribe(action => {
      this.create(categoria);
    });
  }
}
