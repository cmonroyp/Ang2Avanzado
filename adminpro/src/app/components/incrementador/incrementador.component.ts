import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';


@Component({
  selector: 'app-incrementador',
  templateUrl: './incrementador.component.html',
  styles: []
})
export class IncrementadorComponent implements OnInit {

  @ViewChild('txtProgess') txtProgress: ElementRef;//valida los valores de cualquier input #txtProgess.

  @Input() progreso: number = 50;
  // @Input() leyenda: string = 'leyenda';
  @Input('nombre') leyenda: string = 'leyenda';//en caso que se quiera nombar diferente en el componente padre
  @Output() cambioValor: EventEmitter<number> = new EventEmitter();

  constructor() { }

  ngOnInit() {
    console.log('datos recibidos',this.leyenda);
    console.log('datos recibidos progreso',this.progreso);
  }

  onChanges( newValue: number ){
    
    //controla que solo escriba en el input valores de 0 a 100
    //let elemHTML:any = document.getElementsByName('progreso')[0];    

    if(newValue >= 100){
      this.progreso = 100;
    }else if(newValue <=0){
      this.progreso = 0;
    }
    else{
      this.progreso = newValue;
    }

    //devuelvo al elemHTML el valor digitado en el input 
    //elemHTML.value = this.progreso;
   
    this.txtProgress.nativeElement.value = this.progreso;
    this.cambioValor.emit(this.progreso);
  }

  cambiar_valor( valor: number ){

    if(this.progreso >=100 && valor >0){
      this.progreso = 100;
      return;
    }

    if(this.progreso <=0 && valor <0){
      this.progreso = 0;
      return;
    }
    this.progreso += valor;
    this.cambioValor.emit(this.progreso);//se envia valor hacia el componente padre
    //activa focus en el input seleccionado
    this.txtProgress.nativeElement.focus();
  }

}
