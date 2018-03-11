import { Routes, RouterModule, ActivatedRoute } from '@angular/router';

import { PagesComponent } from '../pages/pages.component';
import { DashboardComponent } from '../pages/dashboard/dashboard.component';
import { ProgressComponent } from '../pages/progress/progress.component';
import { Graficas1Component } from '../pages/graficas1/graficas1.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { PromesasComponent } from './promesas/promesas.component';
import { RxjsComponent } from './rxjs/rxjs.component';
//Guards
import { LoginGuard } from '../services/service.index';


const PAGES_ROUTES: Routes =[
    {
        path:'', 
        component: PagesComponent,
        canActivate:[LoginGuard],
        children:[

            {path:'dashboard', component: DashboardComponent, data: {titulo: 'Dashboard'}},
            {path:'progress', component: ProgressComponent, data: {titulo: 'Progress'}},
            {path:'graficas1', component: Graficas1Component, data: {titulo: 'Graficas'}},
            {path:'promesas', component: PromesasComponent, data: {titulo: 'Promesas'}},
            {path:'rxjs', component: RxjsComponent, data: {titulo: 'RxJs'}},
            {path:'account-settings', component: AccountSettingsComponent, data: {titulo: 'Ajustes de Tema'}},
            {path:'', redirectTo:'/dashboard', pathMatch:'full'},
        ]
    },
];

export const PAGES_ROUTING = RouterModule.forChild(PAGES_ROUTES);