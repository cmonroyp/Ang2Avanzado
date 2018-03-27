import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {HttpClientModule} from '@angular/common/http';

//Servicios del Sitio 
import { SettingsService, 
         SharedService,
         SidebarService,
         UsuarioService,
         HospitalService,
         MedicoService,
         LoginGuard,
         AdminGuard,
        SubirArchivoService } from '../services/service.index';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule
  ],
  declarations: [],
  providers: [
    SettingsService,
    SharedService,
    SidebarService,
    UsuarioService,
    HospitalService,
    MedicoService,
    LoginGuard,
    AdminGuard,
    SubirArchivoService,
  ],
})
export class ServicesModule { }
