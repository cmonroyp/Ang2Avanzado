import { Injectable, EventEmitter } from '@angular/core';


@Injectable()
export class ModalUploadService {

  public tipo: string;
  public id: string;

  public notificacion = new EventEmitter<any>(); 
  constructor() { 
    console.log('modal upload service listo!.');
  }

  ocultarModal(){

  }

  mostrarModal(){
    
  }

}
