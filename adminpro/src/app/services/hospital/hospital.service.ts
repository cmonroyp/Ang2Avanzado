import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map} from 'rxjs/operators';
//Service 
import { UsuarioService } from '../../services/usuario/usuario.service';
//model
import { Hospital } from '../../models/hospital.model';
//Url 
import { AppSettings } from '../../config/config.api';

@Injectable()
export class HospitalService {

  token: string;
  hospital: Hospital;
  url: string;

  constructor(public http: HttpClient,
              public _usuarioService: UsuarioService) {

                this.url = AppSettings.API_ENDPOIND;
                this.token = this._usuarioService.token;
               }


  cargarHospitales( desde:number ){
 
    let headers = new HttpHeaders({'Content-Type':'application/json',
                                  'Authorization': this.token })
    return this.http.get(`${this.url}getHospitales/${desde}`,{headers})
              .pipe(
                map((resp)=>{
                  return resp;
                })
              )
  }

  actualizarHospital(hospital: Hospital){

    let body = JSON.stringify(hospital);
    let headers = new HttpHeaders({'Content-Type':'application/json',
                                  'Authorization': this.token })
     return this.http.put(`${this.url}updateHospital/${hospital._id}`, body, {headers})
                .pipe(
                  map((resp:any)=>{
                  swal("Hospital Actualizado!","", "success");
                  return true;
                  })
                )
  }

  borrarHospital( hospital_id: string ){

    let headers = new HttpHeaders({'Content-Type':'application/json',
                                  'Authorization': this.token })
    return this.http.delete(`${this.url}deleteHospital/${hospital_id}`, {headers})
                .pipe(
                  map((resp)=>{
                    swal("Hospital Eliminado!","", "success");
                    return true;
                  })
                )
  }

  // crearHospital( hospital: string ){

  //   //  let body = JSON.parse(hospital);
  //   let headers = new HttpHeaders({'Content-Type':'application/json',
  //                                 })

  //  return this.http.post(`${this.url}addhospital/`, hospital, {headers})
  //             .pipe(
  //               map((res:any)=>{
  //                 swal('Usuario Creado', res.nombre ,'success');
  //                 return  res.hospital;
  //               }),
                
  //             )
  // }

  crearHospital( nombre: string ) {

    let url = this.url + 'crear-hospital';
    url += '?token=' + this._usuarioService.token;

    return this.http.post( url, { nombre } )
              // .map( (resp: any) => resp.hospital );

  }

  inputBuscarHospitales( termino: string ){

    let headers = new HttpHeaders({'Content-Type':'application/json',
                                  'Authorization': this.token })

    return this.http.get(`${this.url}/coleccion/hospitales/${termino}`, {headers})
               .pipe(
                 map((resp:any)=>{
                   return resp.hospitales;
                 })
               )
  }

}
