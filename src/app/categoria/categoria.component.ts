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

  categoria;
  group: FormGroup;
  categorias: Array<Categoria>;
  displayedColumns: string[] = ['descricao', 'delete'];

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

  salvar() {
    if (this.categoria == undefined) {
      this.categoriaService.create(this.group.value).subscribe(() => { }, () => { }, () => { this.findAll(); });
    } else {
      let model = this.group.value;
      model.id = this.categoria.id;
      this.categoriaService.update(this.group.value).subscribe(() => { }, () => { }, () => {
        this.categoria = undefined;
        this.group.reset();
        this.findAll();
      });
    }
  }

  findAll() {
    this.categoriaService.findAll().subscribe(data => {
      this.categorias = data as unknown as Categoria[];
    });
  }
  
  edit(obj) {
    this.categoria = obj;
    this.group.patchValue(obj);
  }
  
  delete(item) {
    this.categoriaService.delete(item.id).subscribe(() => { }, () => { }, () => {
      this.categoria = undefined;
      this.group.reset();
      this.findAll();
    });
  }

}
