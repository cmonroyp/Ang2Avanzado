import { Routes, RouterModule, ActivatedRoute } from '@angular/router';

import { PagesComponent } from '../pages/pages.component';
import { DashboardComponent } from '../pages/dashboard/dashboard.component';
import { ProgressComponent } from '../pages/progress/progress.component';
import { Graficas1Component } from '../pages/graficas1/graficas1.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';


const PAGES_ROUTES: Routes =[
    {
        path:'', 
        component: PagesComponent,
        children:[

            {path:'dashboard', component: DashboardComponent},
            {path:'progress', component: ProgressComponent},
            {path:'graficas1', component: Graficas1Component},
            {path:'account-settings', component: AccountSettingsComponent},
            {path:'', redirectTo:'/dashboard', pathMatch:'full'},
        ]
    },
];

export const PAGES_ROUTING = RouterModule.forChild(PAGES_ROUTES);