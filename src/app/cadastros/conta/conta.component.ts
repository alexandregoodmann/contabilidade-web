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
  contas: Array<Conta>;

  bancos: Array<Banco>;
  filteredOptions: Observable<Banco[]>;

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

  private _filter(value: string): Banco[] {
    if (this.bancos) {
      const filtered = this.bancos.filter(o => o.banco.toLowerCase().includes(value.toLowerCase()));
      return filtered;
    }
  }

  private getBancos() {
    this.bancoService.findAll().subscribe(data => {
      this.bancos = data as unknown as Array<Banco>;
    });
  }

  private buildGroup() {
    this.group = this.fb.group({
      id: [null],
      conta: [null, [Validators.required]],
      banco: [null, [Validators.required]]
    });
  }

  add() {
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
      this.contas = data as unknown as Conta[];
    });
  }

  openSnackBar(message: string, action: string, conta: Conta) {
    this.snackBar.open(message, action, { duration: 3000 }).onAction().subscribe(action => {
      this.create(conta);
    });
  }

}
