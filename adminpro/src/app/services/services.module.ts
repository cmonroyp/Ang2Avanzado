import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

//Servicios del Sitio 
import { SettingsService, 
         SharedService,
         SidebarService } from '../services/service.index';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [],
  providers: [
    SettingsService,
    SharedService,
    SidebarService 
  ],
})
export class ServicesModule { }
