import { Component, OnInit } from '@angular/core';

//cargar todos los complementos jquery fuera de angular
declare function init_pluings();

@Component({
  selector: 'app-nopagefound',
  templateUrl: './nopagefound.component.html',
  styles: []
})
export class NopagefoundComponent implements OnInit {

  anio: number = new Date().getFullYear();
  constructor() { }

  ngOnInit() {
    init_pluings();
  }

}
