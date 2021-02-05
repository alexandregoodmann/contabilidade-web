import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { Categoria } from 'src/app/shared/model/categoria';
import { CategoriaService } from 'src/app/shared/services/categoria.service';

@Component({
  selector: 'app-categoria',
  templateUrl: './categoria.component.html',
  styleUrls: ['./categoria.component.css']
})
export class CategoriaComponent implements OnInit {

  group: FormGroup;
  categorias: Array<Categoria>;

  constructor(
    private fb: FormBuilder,
    private categoriaService: CategoriaService,
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
    this.categoriaService.create(categoria).subscribe(data => {
    }, (err) => { }, () => {
      this.buildGroup();
      this.findAll();
    });
  }

  delete(categoria: Categoria) {
    this.categoriaService.delete(categoria.id).subscribe(data => {
    }, (err) => { }, () => {
      this.openSnackBar('Categoria excluída', 'Desfazer', categoria);
      this.findAll();
    });
  }

  findAll() {
    this.categoriaService.findAll().subscribe(data => {
      this.categorias = data as unknown as Categoria[];
    });
  }

  openSnackBar(message: string, action: string, categoria: Categoria) {
    this.snackBar.open(message, action, { duration: 3000 }).onAction().subscribe(action => {
      this.create(categoria);
    });
  }
}
