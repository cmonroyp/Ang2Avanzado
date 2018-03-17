import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpEventType } from '@angular/common/http';
import { Router } from '@angular/router';
import { map} from 'rxjs/operators';
//Model
import { Usuario } from '../../models/usuario.model';
//Url 
import { AppSettings } from '../../config/config.api';
//Servicio de imagenes
import { SubirArchivoService } from '../subir-archivos/subir-archivo.service';


interface ItemsResponse {
  results: string[];
}

@Injectable()
export class UsuarioService {

  url:string;

  usuario: Usuario;
  token;

  constructor(public http: HttpClient,
              public route: Router,
              public _subirArchivoService:SubirArchivoService) { 

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

  actualizarUsuario(usuario:Usuario, token:string){

    let body = JSON.stringify(usuario);
    let headers = new HttpHeaders({'Content-Type':'application/json',
                                    'Authorization': token });

    return this.http.put(`${this.url}updateUsuario/${usuario._id}`,body, {headers})
               .pipe(
                 map((resp:any)=>{
                  this.guardarStorage( this.token, resp.usuario );
                  swal("Usuario Actualizado!","", "success");
                  return true;
                 })
               )
  }

  cambiarImagen( archivo: File, id: string ) {

    this._subirArchivoService.subirArchivo( archivo, 'usuarios', id )
          .then( (resp: any) => {
           
            this.usuario.img = resp.usuarios.img; 
            swal( 'Imagen Actualizada', this.usuario.nombre, 'success' );
            // this.guardarStorage( id, this.token, this.usuario, this.menu );
            this.guardarStorage( this.token, this.usuario );
          })
          .catch( resp => {
            console.log( resp );
          }) ;

  }

  cargarUsuarios( desde:number ){
 
    let headers = new HttpHeaders({'Content-Type':'application/json',
                                  'Authorization': this.token })

    // return this.http.get(`${this.url}getUsuarios/${desde}`, {headers,observe: 'events', reportProgress: true})
    return this.http.get(`${this.url}getUsuarios/${desde}`,{headers})
              .pipe(
                map((event)=>{
                  // if (event.type === HttpEventType.DownloadProgress) {
                  //   console.log('downloaded bytes',event.loaded); //downloaded bytes
                  //   console.log('total bytes to download',event.total); //total bytes to download
                  // }
                  // if (event.type === HttpEventType.UploadProgress) {
                  //   console.log('uploaded bytes',event.loaded); //uploaded bytes
                  //   console.log('total bytes to upload',event.total); //total bytes to upload
                  // }
                  // if (event.type === HttpEventType.Response) {
                  //   console.log('response',event.body);
                  //   return event.body
                  // }
                  // if (event.type === HttpEventType.ResponseHeader) {
                  //   console.log('ResponseHeader',event);
             
                  // }

                  return event;
                })
              )
  }

  inputBuscarUsuarios( termino: string ){

    let headers = new HttpHeaders({'Content-Type':'application/json',
                                  'Authorization': this.token })

    return this.http.get(`${this.url}/coleccion/usuarios/${termino}`, {headers})
               .pipe(
                 map((resp:any)=>{
                   return resp.usuarios;
                 })
               )
  }

  borrarUsuario( usuario_id: string ):Observable<any>{  
    
    let headers = new HttpHeaders({'Content-Type':'application/json',
                                  'Authorization': this.token })
      return this.http.delete(`${this.url}deleteUsuario/${usuario_id}`, {headers})
                 .pipe(
                   map((resp)=>{
                    swal(`Poof! El usuario ha sido eliminado correctamente!.`, {
                      icon: "success",
                    });
                     return resp;
                   })
                 )
  }

}
