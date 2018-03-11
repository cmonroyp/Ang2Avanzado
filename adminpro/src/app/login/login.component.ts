import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
//llamar inicializaciones que estan fuera de angular como jquery
declare function init_pluings();

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
  constructor(private _router: Router,
              public _usuarioService: UsuarioService) { }

  ngOnInit() {
    init_pluings();//se inicializan todos los pluings del sitio Web, que estan en el index.html como 'assets/js/custom.js'
   //codigo para recordar datos
    this.email = localStorage.getItem('recordarme') || '';
    if( this.email.length > 0 ){
      this.recordarme = true;
    }
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
    this._router.navigate(['/dashboard']);
  }
}
