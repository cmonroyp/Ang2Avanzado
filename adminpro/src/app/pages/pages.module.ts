import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
//trabajar los [(ngModel)] 
import { FormsModule } from '@angular/forms';

import { PagesComponent } from './pages.component';

import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Graficas1Component } from './graficas1/graficas1.component';

//modules Shared
import { SharedModule } from '../shared/shared.module';

//Rutas hijas 
import { PAGES_ROUTING } from './pages.routing';
//temporal
import { IncrementadorComponent } from '../components/incrementador/incrementador.component';
//ng2Cahrts 
import { ChartsModule } from 'ng2-charts';
//Graficas 
import { GraficoDonaComponent } from '../components/grafico-dona/grafico-dona.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';


@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    PAGES_ROUTING,
    FormsModule,
    ChartsModule
  ],
  declarations: [
    PagesComponent,//Componente principal padre
    DashboardComponent,
    ProgressComponent,
    Graficas1Component,
    IncrementadorComponent,
    GraficoDonaComponent,
    AccountSettingsComponent
  ],
  exports:[
    DashboardComponent,
    ProgressComponent,
    Graficas1Component,
    IncrementadorComponent,
    // GraficoDonaComponent
  ],
})
export class PagesModule { }
