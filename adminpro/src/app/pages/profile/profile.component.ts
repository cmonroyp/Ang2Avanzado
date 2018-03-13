import { Component, OnInit } from '@angular/core';
//servicio
import { UsuarioService } from '../../services/service.index';
//model
import { Usuario } from '../../models/usuario.model';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styles: []
})
export class ProfileComponent implements OnInit {

  usuario:Usuario;
  token;

  imagenSubir: File;
  imagenTemp: string;

  constructor(public _usuarioService: UsuarioService) { }

  ngOnInit() {
    this.usuario = this._usuarioService.usuario;
    this.token = this._usuarioService.token;

  }

  onSubmit(usuario: Usuario){  
 
      this.usuario.nombre = usuario.nombre;
      if(!this.usuario.google){
        this.usuario.email = usuario.email;
      }

      this._usuarioService.actualizarUsuario(this.usuario,this.token)
          .subscribe();
  }

  seleccionImage( archivo: File ) {

    if ( !archivo ) {
      this.imagenSubir = null;
      return;
    }

    if ( archivo.type.indexOf('image') < 0 ) {
      swal('Sólo imágenes', 'El archivo seleccionado no es una imagen', 'error');
      this.imagenSubir = null;
      return;
    }

    this.imagenSubir = archivo;

    let reader = new FileReader();
    let urlImagenTemp = reader.readAsDataURL( archivo );

    reader.onloadend = () => this.imagenTemp = reader.result;

  }

  cambiarImagen() {

    this._usuarioService.cambiarImagen( this.imagenSubir, this.usuario._id );

  }
}
