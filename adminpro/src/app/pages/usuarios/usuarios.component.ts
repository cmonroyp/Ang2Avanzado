import { Component, OnInit } from '@angular/core';
//model
import { Usuario } from '../../models/usuario.model';
//Service
import { UsuarioService } from '../../services/service.index';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styles: []
})
export class UsuariosComponent implements OnInit {

  usuarios: Usuario[] =[];
  desde:number = 0;
  totalRegistros:number = 0;

  cargando: boolean = true;
  usuario_id: string;

  constructor(public _usuarioService: UsuarioService) { }

  ngOnInit() {
    this.cargarUsuarios();
    this.usuario_id = this._usuarioService.usuario._id;
  }

  cargarUsuarios(){

    this.cargando = true;
    this._usuarioService.cargarUsuarios( this.desde )
        .subscribe((resp:any)=>{
          this.usuarios = resp.usuarios;
          this.totalRegistros = resp.total;
          this.cargando = false;
        });
  }


  cambiarPagina( valor: number ) {

    let desde = this.desde + valor;

    if ( desde >= this.totalRegistros ) {
      return;
    }

    if ( desde < 0 ) {
      return;
    }

    this.desde += valor;
    this.cargarUsuarios();

  }

  buscarUsuario( termino : string ){
    
    this.cargando = true;
    this._usuarioService.inputBuscarUsuarios( termino )
        .subscribe((usuarios: Usuario[])=>{
          this.usuarios = usuarios;
          this.cargando = false;
        });
  }

  borraUsuario( usuario: Usuario ){

    if( Object.is(this.usuario_id,usuario._id) ){
      swal('No puede borrar usuario', 'No se puede borrar a si mismo', 'error');
      return;
    }

    swal({
      title: '¿Está seguro?',
      text: 'Está a punto de borrar a '  +  `${usuario.nombre}`,
      icon: 'warning',
      buttons: ['Cancelar', 'Aceptar'],
      dangerMode: true,
      })
      .then(borrar => {
      
      if (borrar) {
      this._usuarioService.borrarUsuario(usuario._id)
          .subscribe(borrado => {
          console.log(borrado);
          this.cargarUsuarios();
          
          });
        }

      });
  }
}
