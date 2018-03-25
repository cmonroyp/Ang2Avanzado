import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { map} from 'rxjs/operators';
//Url 
import { AppSettings } from '../../config/config.api';
//model
import { Medico } from '../../models/medico.model';

@Injectable()
export class MedicoService {

  token: string;
  medico: Medico;
  public url: string;

  constructor(private http: HttpClient) { 

        this.url = AppSettings.API_ENDPOIND;
        this.token = localStorage.getItem('token');
  }

  inputBuscarMedicos( termino: string ){

    let headers = new HttpHeaders({'Content-Type':'application/json',
                                  'Authorization': this.token })

    return this.http.get(`${this.url}/coleccion/medicos/${termino}`, {headers})
               .pipe(
                 map((resp:any)=>{
                   return resp.medicos;
                 })
               )
  }

  cargarMedicos(){
 
    let headers = new HttpHeaders({'Content-Type':'application/json',
                                  'Authorization': this.token })
    return this.http.get(`${this.url}getMedicos`,{headers})
              .pipe(
                map((resp)=>{
                  return resp;
                })
              )
  }

  borrarMedico( medico_id: string ){

    let headers = new HttpHeaders({'Content-Type':'application/json',
                                  'Authorization': this.token })
    return this.http.delete(`${this.url}delete-medico/${medico_id}`, {headers})
                .pipe(
                  map((resp)=>{
                    swal("Medico Eliminado!","", "success");
                    return true;
                  })
                )
  }

  guardarMedico( medico: Medico ){

    let params = JSON.stringify(medico);
    let headers = new HttpHeaders({'Content-Type':'application/json',
                                  'Authorization': this.token })

    if(medico._id){
      //Actualiza
      return this.http.put(`${this.url}update-medico/${medico._id}`, params, { headers })
                  .pipe(
                    map((resp: any)=>{
                      swal("Medico Actualizado!",resp.medico.nombre, "success");
                      return resp.medico;
                    })
                  )
    }else{
      //Crea uno nuevo
      return this.http.post(`${this.url}crear-medico`, params, { headers })
                  .pipe(
                    map((resp: any )=>{
                      swal("Medico Creado!",resp.medico.nombre, "success");
                      return resp.medico;
                    })
                  )
    }
  }

  buscarMedico_Id( id: string ){

    let headers = new HttpHeaders({'Content-Type':'application/json',
                                  'Authorization': this.token })
    return this.http.get(`${this.url}medico/${id}`, { headers })
               .pipe(
                 map((resp:any)=>{  
                   return resp.medico;
                 })
               )
  }

}
