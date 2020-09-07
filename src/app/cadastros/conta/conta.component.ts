import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { Banco } from 'src/app/shared/model/banco';
import { Conta } from 'src/app/shared/model/conta';
import { BancoService } from 'src/app/shared/services/banco.service';
import { ContaService } from 'src/app/shared/services/conta.service';

@Component({
  selector: 'app-conta',
  templateUrl: './conta.component.html',
  styleUrls: ['./conta.component.css']
})
export class ContaComponent implements OnInit {

  group: FormGroup;
  categorias: Array<Conta>;

  bancos: Array<Banco>;
  options: Array<string>;
  filteredOptions: Observable<string[]>;

  constructor(
    private fb: FormBuilder,
    private bancoService: BancoService,
    private contaService: ContaService,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit() {
    this.buildGroup();
    this.findAll();
    this.getBancos();
    this.filteredOptions = this.group.get('banco').valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value))
    );
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    if (this.options) {
      const filtered = this.options.filter(option => option.toLowerCase().includes(filterValue));
      console.log(filtered);
      return filtered;
    }
  }

  private getBancos() {
    this.bancoService.findAll().subscribe(data => {
      this.bancos = data as unknown as Array<Banco>;
      this.options = [];
      this.bancos.forEach(b => {
        this.options.push(b.banco);
      });
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
    this.create(this.group.value);
  }

  create(conta: Conta) {
    this.contaService.create(conta).subscribe(data => {
    }, (err) => { }, () => {
      this.buildGroup();
      this.findAll();
    });
  }

  delete(conta: Conta) {
    this.contaService.delete(conta.id).subscribe(data => {
    }, (err) => { }, () => {
      this.openSnackBar('Conta excluída', 'Desfazer', conta);
      this.findAll();
    });
  }

  findAll() {
    this.contaService.findAll().subscribe(data => {
      this.categorias = data as unknown as Conta[];
    });
  }

  openSnackBar(message: string, action: string, conta: Conta) {
    this.snackBar.open(message, action, { duration: 3000 }).onAction().subscribe(action => {
      this.create(conta);
    });
  }

}
