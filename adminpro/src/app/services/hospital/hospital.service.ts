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
  public url: string;

  constructor(public http: HttpClient,
              public _usuarioService: UsuarioService) {

                // // this.token = this._usuarioService.token;
                this.url = AppSettings.API_ENDPOIND;
                this.token = localStorage.getItem('token');
                console.log('token servicio', this.token)

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

  getAllHospitals(){
 
    let headers = new HttpHeaders({'Content-Type':'application/json',
                                  'Authorization': this.token })
    return this.http.get(`${this.url}get-hospitales`,{headers})
              .pipe(
                map((resp)=>{
                  return resp;
                })
              )
  }

  buscarHospital_Id( id: string ){

    let headers = new HttpHeaders({'Content-Type':'application/json',
                                  'Authorization': this.token })
    return this.http.get(`${this.url}get-hospital/${id}`, { headers })
               .pipe(
                 map((resp:any)=>{  
                   return resp;
                 })
               )
  }

  actualizarHospital(hospital: Hospital){

    let body = JSON.stringify(hospital);
    let headers = new HttpHeaders({'Content-Type':'application/json',
                                  'Authorization': this.token })
     return this.http.put(`${this.url}update-hospital/${hospital._id}`, body, {headers})
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

  crearHospital( hospital_nombre: string ){

    let headers = new HttpHeaders({'Content-Type':'application/json',
                                   'Authorization': this.token })

   return this.http.post(`${this.url}crear-hospital`,{'nombre': hospital_nombre }, { headers })
              .pipe(
                map((res:any)=>{
                  swal('Hospital Creado', res.hospital.nombre ,'success');
                  return  true;
                }),
                
              )
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
