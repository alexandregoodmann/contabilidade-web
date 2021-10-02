import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { LoaderService } from '../../services/loader.service';

@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.css']
})
export class TopBarComponent implements OnInit {

  @Input() titulo: string;

  constructor(
    private router: Router,
    private loaderService: LoaderService
  ) { }

  ngOnInit() {
  }

  irPrincipal() {
    this.router.navigateByUrl('/');
  }

}
