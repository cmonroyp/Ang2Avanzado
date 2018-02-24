import { Component, OnInit } from '@angular/core';

declare function init_pluings();

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styles: []
})
export class PagesComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    init_pluings();//se inicializan todos los pluings del sitio Web, que estan en el index.html como 'assets/js/custom.js'
  }

}
