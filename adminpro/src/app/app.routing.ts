import { Routes, RouterModule, ActivatedRoute } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './login/register.component';
import { NopagefoundComponent } from './shared/nopagefound/nopagefound.component';
import { PagesComponent } from './pages/pages.component';
import { LoginGuard } from './services/guards/login.guard';

const APP_ROUTES: Routes =[
   
    {path:'login', component: LoginComponent},
    {path:'register', component: RegisterComponent},
    {
        path:'',  
        component: PagesComponent,
        canActivate:[LoginGuard],
        loadChildren: './pages/pages.module#PagesModule'
    },
    {path:'**', component: NopagefoundComponent}
]

export const APP_ROUTING = RouterModule.forRoot(APP_ROUTES, {useHash:true});