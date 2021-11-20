import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.scss'],
})
export class PagesComponent implements OnInit {
  public sidenavOpen: boolean;

  constructor() {
    this.sidenavOpen = false;
  }

  ngOnInit() {}

  openSidenav() {
    this.sidenavOpen = !this.sidenavOpen;
  }
}
