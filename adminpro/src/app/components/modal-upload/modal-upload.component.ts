import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

//Servicio 
import { SubirArchivoService } from '../../services/service.index';
// import { ModalUploadService } from './modal-upload.service';

 declare var $:any;
@Component({
  selector: 'app-modal-upload',
  templateUrl: './modal-upload.component.html',
  styles: []
})
export class ModalUploadComponent implements OnInit {

  imagenSubir: File;
  imagenTemp: string;
  respuesta:boolean = false;

  public tipo: string;
  public id: string;

  @Output() notificacion:EventEmitter<void> = new EventEmitter<void>();

  constructor(public _subirArchivoService: SubirArchivoService) { }

  ngOnInit() {
  }

  seleccionImage( archivo: File ) {
    console.log(archivo.name)
    if ( !archivo ) {
      this.imagenSubir = null;
      return;
    }

    if ( archivo.type.indexOf('image') < 0 ) {
      swal('Sólo imágenes', 'El archivo seleccionado no es una imagen', 'error');
      this.imagenSubir = null;
      return;
    }

    this.imagenSubir = archivo;

    let reader = new FileReader();
    let urlImagenTemp = reader.readAsDataURL( archivo );
    reader.onloadend = () => this.imagenTemp = reader.result;

  }

  subirImagen(){
    // console.log(this.id);
    // console.log(this.tipo)
    this._subirArchivoService.subirArchivo(this.imagenSubir,this.tipo,this.id)
        .then((resp:any)=>{
          //cierra modal
           $('#exampleModalLong').modal('hide');
           this.notificacion.emit(resp); 
           swal("Imagen Actualizada Correctamente","", "success");
        })
        .catch((err)=>{
          this.notificacion.emit(err);
          console.log('Error en la actualizacion de la imagen', err);
        });  
    }
}
