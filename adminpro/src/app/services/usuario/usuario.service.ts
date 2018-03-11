import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
//Model
import { Usuario } from '../../models/usuario.model';
//Url 
import { AppSettings } from '../../config/config.api';

interface ItemsResponse {
  results: string[];
}

@Injectable()
export class UsuarioService {

  url:string;
  
  constructor(public http: HttpClient) { 
    this.url = AppSettings.API_ENDPOIND;

    console.log('Servicio de Usuario Listo!.');
  }

  login( usuario: Usuario, recordarme:boolean = false){

    // let headers = new HttpHeaders({
    //   'token': this.token
    //   });
    if( recordarme ){
      localStorage.setItem('recordarme', usuario.email);
    }else{
      localStorage.removeItem('recordarme');
    }

    let body = JSON.stringify(usuario);
    let headers = new HttpHeaders({'Content-Type':'application/json'});

   return this.http.post(`${this.url}login`,body,{headers})
              .pipe(
                map((res:any)=>{
                  //swal('Logueado Satisfactoriamente', usuario.email,'success');
                  localStorage.setItem('usuario',JSON.stringify(res.usuario));
                  localStorage.setItem('token', res.token);
                  return  res;
                }),
                
              )
  }

  crearUsuario( usuario: Usuario ){

    let body = JSON.stringify(usuario);
    let headers = new HttpHeaders({'Content-Type':'application/json'});
   
   return this.http.post(`${this.url}addUsuario`, body, {headers})
              .pipe(
                map((res:any)=>{
                  swal('Usuario Creado', usuario.email,'success');
                  return  res.usuario;
                }),
                
              )
  }
}
