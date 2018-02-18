import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-grafico-dona',
  templateUrl: './grafico-dona.component.html',
  styles: []
})
export class GraficoDonaComponent implements OnInit {

  public graficas;
  @Input('graficos')graficos:Object = {};

  constructor() { }

  ngOnInit() {
    console.log('data recibida', this.graficos);
    this.graficas = this.graficos;
  }

}
