import { Pipe, PipeTransform } from '@angular/core';
import { AppSettings } from '../config/config.api';
import { HttpHeaders } from '@angular/common/http';

@Pipe({
  name: 'imagen'
})
export class ImagenPipe implements PipeTransform {

  transform(img: string, tipo: string = 'usuario'): any {

    let url = AppSettings.API_ENDPOIND;
    
    if(!img){
      //retorna la imagen por defecto del servicio api, en caso de no venir imagen.
      return url + 'imagen/usuarios/xxx';
    }

    //imagen de google
    if( img.indexOf('https') >=0){
        return img;
    }

    switch (tipo) {
      case 'usuario':
           url += 'imagen/usuarios/' + img;
        break;
      
        case 'medico':
           url += 'imagen/medicos/' + img;
        break;

        case 'hospital':
           url += 'imagen/hospitales/' + img;
        break;

        default:
          console.log('tipo de imagen no existe, usuarios, medicos, hospitales');
          url += 'imagen/usuarios/xxx';
    }

    return url;
  }

}
