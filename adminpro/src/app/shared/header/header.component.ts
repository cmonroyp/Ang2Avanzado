import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

//service
import { UsuarioService } from '../../services/service.index';
//model
import { Usuario } from '../../models/usuario.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: []
})
export class HeaderComponent implements OnInit {

  usuario: Usuario;
  constructor(public _usuarioService: UsuarioService,
              public _router: Router) { }

  ngOnInit() {
    this.usuario = this._usuarioService.usuario;
  }

  logout(){
    this._usuarioService.logout();
  }

  buscar( termino : string ){
    this._router.navigate(['/busqueda', termino ]);   
  }
}
