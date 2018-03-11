import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
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

  usuario: Usuario;
  token: String;

  constructor(public http: HttpClient,
              public route: Router) { 
    this.url = AppSettings.API_ENDPOIND;
    //carga lo que haya en el storage.
    this.cargarStorage();
  }

  estaLogueado(){
    return (this.token.length > 5 )? true: false;
  }

  cargarStorage(){

    if( localStorage.getItem('token') ){
      this.token = localStorage.getItem('token');
      this.usuario = JSON.parse(localStorage.getItem('usuario'));
    }else{
      this.token = '';
      this.usuario = null;
    }
  } 

  guardarStorage(token:string, usuario:Usuario){

    localStorage.setItem('usuario',JSON.stringify(usuario));
    localStorage.setItem('token', token);

    this.usuario = usuario;
    this.token = token;
  }

  removerToken(){
    localStorage.removeItem('token');
    localStorage.removeItem('usuario');
    this.token = '';
    this.usuario = null;
  }

  // =========================================================
  // Salir de la aplicaicon!.
  // =========================================================
  logout(){
    this.removerToken();
    this.route.navigate(['/login']);
  }

  // =========================================================
  // Login con Google
  // =========================================================
  loginGoogle( token: string ){

      return this.http.post(`${this.url}google`, { token })
                 .pipe(
                   map((res:any)=>{
                      this.guardarStorage(res.token,res.usuario);
                      return true;
                   })
                 )
  }


  // =========================================================
  // Login Normal
  // =========================================================
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
                  this.guardarStorage(res.token,res.usuario);
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
