import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PagesComponent } from './pages.component';

import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Graficas1Component } from './graficas1/graficas1.component';

//modules Shared
import { SharedModule } from '../shared/shared.module';

//Rutas hijas 
import { PAGES_ROUTING } from './pages.routing';


@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    PAGES_ROUTING
  ],
  declarations: [
    PagesComponent,//Componente principal padre
    DashboardComponent,
    ProgressComponent,
    Graficas1Component,
  ],
  exports:[
    DashboardComponent,
    ProgressComponent,
    Graficas1Component,
  ],
})
export class PagesModule { }
