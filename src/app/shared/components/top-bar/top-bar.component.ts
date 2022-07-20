import { Location } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { LoaderService } from '../../services/loader.service';

@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.css']
})
export class TopBarComponent implements OnInit {

  @Input() titulo: string;

  constructor(
    private loaderService: LoaderService,
    private location: Location
  ) { }

  ngOnInit() {
  }

  voltar() {
    this.location.back();
  }

  get loader() {
    return this.loaderService;
  }
}
