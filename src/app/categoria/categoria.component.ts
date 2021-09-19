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
    this.group = this.fb.group({
      descricao: [null, [Validators.required]]
    });
    this.findAll();
  }

  add() {
    this.categoriaService.create(this.group.value).subscribe(() => { }, () => { }, () => { this.findAll(); });
  }

  delete(categoria: Categoria) {
    this.categoriaService.delete(categoria.id).subscribe(() => { }, () => { }, () => { this.findAll(); });
  }

  findAll() {
    this.categoriaService.findAll().subscribe(data => {
      this.categorias = data as unknown as Categoria[];
    });
  }

}
