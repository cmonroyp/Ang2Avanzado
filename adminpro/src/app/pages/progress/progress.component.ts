import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-progress',
  templateUrl: './progress.component.html',
  styles: []
})
export class ProgressComponent implements OnInit {

  public progresoAzul: number = 30;
  public progresoVerde: number = 20;

  constructor() { }

  ngOnInit() {
  }

  // cambio_valor(event){
  //     console.log(event);
  // }

}
