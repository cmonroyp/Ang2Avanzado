import { Injectable } from '@angular/core';
import { UsuarioService } from '../usuario/usuario.service';

@Injectable()
export class SidebarService {

  menu:any []= [];
  // menu:Array<any> =[
  //   {
  //     titulo: 'Principal',
  //     icono: 'mdi mdi-gauge',
  //     subMenu:[
  //       { titulo: 'Dashboard', url: '/dashboard' },
  //       { titulo: 'Progress', url: '/progress' },
  //       { titulo: 'Graficas1', url: '/graficas1' },
  //       { titulo: 'Promesas', url: '/promesas' },
  //       { titulo: 'Rxjs', url: '/rxjs' },
  //     ]
  //   },
  //   {
  //     titulo: 'Mantenimientos',
  //     icono: 'mdi mdi-folder-lock-open',
  //     subMenu:[
  //       {titulo: 'Usuarios', url: '/usuarios'},
  //       {titulo: 'Hospitales', url: '/hospitales'},
  //       {titulo: 'Medicos', url: '/medicos'}
  //     ]
  //   }
  // ];
  constructor( public _usuarioService: UsuarioService) { }

  cargarMenu(){
    this.menu = this._usuarioService.menu;
  }

}
