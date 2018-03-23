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

}
