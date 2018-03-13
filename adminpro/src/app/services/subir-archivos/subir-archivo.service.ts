import { Injectable } from '@angular/core';
//Api
import { AppSettings } from '../../config/config.api';

@Injectable()
export class SubirArchivoService {

  url:string;

  constructor() { 
    this.url = AppSettings.API_ENDPOIND;
  }

  subirArchivo( archivo: File, tipo: string, id: string ) {

    return new Promise( (resolve, reject ) => {

      let formData = new FormData();
      let xhr = new XMLHttpRequest();

      formData.append( 'imagen', archivo, archivo.name );

      xhr.onreadystatechange = function() {

        if ( xhr.readyState === 4 ) {

          if ( xhr.status === 200 ) {
            console.log( 'Imagen subida' );
            resolve( JSON.parse( xhr.response ) );
          } else {
            console.log( 'Fallo la subida' );
            reject( xhr.response );
          }

        }
      };

      let url = `${this.url}upload/` + tipo + '/' +  id;

      xhr.open('POST', url, true );
      xhr.send( formData );

    });
  }
}
