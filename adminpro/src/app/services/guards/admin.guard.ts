import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';

//service
import { UsuarioService } from '../usuario/usuario.service';

@Injectable()
export class AdminGuard implements CanActivate {

  constructor(public _usuarioService: UsuarioService){ }
    
  canActivate(){

    if( this._usuarioService.usuario.role === 'ADMIN_ROLE'){
      return true;
    }else{
      console.log('Bloqueado por el Admin Guard');
      this._usuarioService.logout();
      return false;
    }
  }
}

// Nota: los Guards estan importados en los servicios de este sitio