import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-botao-menu',
  templateUrl: './botao-menu.component.html',
  styleUrls: ['./botao-menu.component.css']
})
export class BotaoMenuComponent  {

  @Input() label: string;
  @Input() icon: string;

  constructor() { }

}
