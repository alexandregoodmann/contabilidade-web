import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.css']
})
export class TopBarComponent implements OnInit {

  @Input() titulo: string;

  constructor(
    private router: Router
  ) { }

  ngOnInit() {
  }

  irPrincipal() {
    this.router.navigateByUrl('/');
  }

}
