import { Component, OnInit} from '@angular/core';
import { FormGroup, FormControl,Validators } from '@angular/forms';
import { Router } from '@angular/router';

//llamar inicializaciones que estan fuera de angular como jquery
declare function init_pluings();
//sweetalert
import * as swal from 'sweetalert';
//Servicio 
import { UsuarioService } from '../services/service.index';

//Model 
import { Usuario } from '../models/usuario.model';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  forma: FormGroup;
  usuario : Usuario;

  sonIguales( campo1: string, campo2: string){

    return (group: FormGroup)=>{

      let pass1 = group.controls[campo1].value;
      let pass2 = group.controls[campo2].value;

      if(pass1 === pass2){
        return null //pasa la validacion
      }
      //error no pasa la validacion
      return {
        sonIguales: true
      }
    }
  }
  constructor(public _usuarioService: UsuarioService,
              public route: Router) { }

  ngOnInit() {

    init_pluings();//se inicializan todos los pluings del sitio Web, que estan en el index.html como 'assets/js/custom.js'
    
    this.forma = new FormGroup({
      nombre: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', Validators.required),
      password2: new FormControl('', Validators.required),
      condiciones: new FormControl(false)
    }, { validators: this.sonIguales('password','password2') })
  }

  registrarUsuario(){

    if(this.forma.invalid){
      return; 
    }

    if(!this.forma.value.condiciones){
      swal('Importante', 'Debe aceptar las condiciones','warning');
    }
    console.log(this.forma.value)
    this.usuario = new Usuario(
         this.forma.value.nombre,
         this.forma.value.email,
         this.forma.value.password
    );

    this._usuarioService.crearUsuario(this.usuario)
        .subscribe((res)=>{
          console.log('componente',res);
            this.route.navigate(['/login']); 
        },err=>{
            console.log(err);
        })
  }

}
