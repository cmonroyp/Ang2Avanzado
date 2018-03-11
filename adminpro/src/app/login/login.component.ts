import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

//llamar inicializaciones que estan fuera de angular como jquery
declare function init_pluings();
declare const gapi: any;

//Servicio
import { UsuarioService } from '../services/service.index';
//model
import { Usuario } from '../models/usuario.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  email:string;
  recordarme:boolean = false;
  
  auth2:any;

  constructor(private _router: Router,
              public _usuarioService: UsuarioService) { }

  ngOnInit() {
    init_pluings();//se inicializan todos los pluings del sitio Web, que estan en el index.html como 'assets/js/custom.js'
    this.googleInit();
    //codigo para recordar datos
    this.email = localStorage.getItem('recordarme') || '';
    if( this.email.length > 0 ){
      this.recordarme = true;
    }
  }

  googleInit() {

    gapi.load('auth2', () => {

      this.auth2 = gapi.auth2.init({
        client_id: '590033353099-kp5tfrlgkiaqc7ihk7293abbbd0du5p7.apps.googleusercontent.com',
        cookiepolicy: 'single_host_origin',
        scope: 'profile email'
      });

      this.attachSignin( document.getElementById('btnGoogle') );

    });

  }


  attachSignin( element ) {

    this.auth2.attachClickHandler( element, {}, (googleUser) => {

      // let profile = googleUser.getBasicProfile();
      let token = googleUser.getAuthResponse().id_token;
 
      this._usuarioService.loginGoogle( token )
              .subscribe(()=>{
                window.location.href = '#/dashboard'
                //this._router.navigate(['/dashboard']);             
              });

    });

  }

  ingresar( forma: NgForm){

    if(forma.invalid){
      return;
    }
    let usuario = new Usuario (null,forma.value.email,forma.value.password)
    //console.log(forma.value);
    this._usuarioService.login(usuario, forma.value.recordarme)
        .subscribe((resp)=>{
          console.log(resp);
          this._router.navigate(['/dashboard']);
        });
    
  }
}
