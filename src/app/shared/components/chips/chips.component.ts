import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'c-chips',
  templateUrl: './chips.component.html',
  styleUrls: ['./chips.component.scss']
})
export class ChipsComponent {

  @Input() class;
  @Input() list: ChipsObject[] = [];

  @Output() selectedEvent = new EventEmitter<string>();

  select(value) {
    this.list.forEach(i=>{
      i.selected = false;
    });
    value.selected = true;
    this.selectedEvent.emit(value);
  }

}

export class ChipsObject {
  key;
  label;
  value?;
  selected?;
}