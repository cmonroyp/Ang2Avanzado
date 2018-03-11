import { Component, OnInit } from '@angular/core';
//Service
import { SidebarService, UsuarioService } from '../../services/service.index';


@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: []
})
export class SidebarComponent implements OnInit {
  
  constructor(public _sidebarService: SidebarService,
              public _usuarioService: UsuarioService) { }

  ngOnInit() {
  }

  logout(){
    this._usuarioService.logout();
  }
}
