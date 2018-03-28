import { Routes, RouterModule, ActivatedRoute } from '@angular/router';

import { PagesComponent } from '../pages/pages.component';
import { DashboardComponent } from '../pages/dashboard/dashboard.component';
import { ProgressComponent } from '../pages/progress/progress.component';
import { Graficas1Component } from '../pages/graficas1/graficas1.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { PromesasComponent } from './promesas/promesas.component';
import { RxjsComponent } from './rxjs/rxjs.component';
import { ProfileComponent } from './profile/profile.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { HospitalComponent } from './hospital/hospital.component';
import { MedicosComponent } from './medicos/medicos.component';
import { MedicoComponent } from './medicos/medico.component';
import { BusquedaComponent } from './busqueda/busqueda.component';
//Guards
import { LoginGuard, AdminGuard, RenuevatokenGuard } from '../services/service.index';


const PAGES_ROUTES: Routes =[

            {
                path:'dashboard', 
                component: DashboardComponent, 
                canActivate:[RenuevatokenGuard],
                data: {titulo: 'Dashboard'}
            },
            {path:'progress', component: ProgressComponent, data: {titulo: 'Progress'}},
            {path:'graficas1', component: Graficas1Component, data: {titulo: 'Graficas'}},
            {path:'promesas', component: PromesasComponent, data: {titulo: 'Promesas'}},
            {path:'rxjs', component: RxjsComponent, data: {titulo: 'RxJs'}},
            {path:'account-settings', component: AccountSettingsComponent, data: {titulo: 'Ajustes de Tema'}},
            {path:'perfil', component: ProfileComponent, data: {titulo: 'Perfil de Usuario'}},
            {path:'busqueda/:termino', component: BusquedaComponent, data: {titulo: 'Buscador'}},
            //Mantenimientos
            {
                path:'usuarios', 
                component: UsuariosComponent, 
                canActivate: [AdminGuard],
                data: {titulo: 'Mantenimiento de Usuarios'}
            },
            {path:'hospitales', component: HospitalComponent, data: {titulo: 'Mantenimiento de Hospitales'}},
            {path:'medicos', component: MedicosComponent, data: {titulo: 'Mantenimiento de Medicos'}},
            {path:'medico/:id', component: MedicoComponent, data: {titulo: 'Actualizar Medico'}},
            {path:'', redirectTo:'/dashboard', pathMatch:'full'},
  


    // {
    //     path:'', 
    //     component: PagesComponent,
    //     canActivate:[LoginGuard],
    //     children:[

    //         {path:'dashboard', component: DashboardComponent, data: {titulo: 'Dashboard'}},
    //         {path:'progress', component: ProgressComponent, data: {titulo: 'Progress'}},
    //         {path:'graficas1', component: Graficas1Component, data: {titulo: 'Graficas'}},
    //         {path:'promesas', component: PromesasComponent, data: {titulo: 'Promesas'}},
    //         {path:'rxjs', component: RxjsComponent, data: {titulo: 'RxJs'}},
    //         {path:'account-settings', component: AccountSettingsComponent, data: {titulo: 'Ajustes de Tema'}},
    //         {path:'perfil', component: ProfileComponent, data: {titulo: 'Perfil de Usuario'}},
    //         {path:'busqueda/:termino', component: BusquedaComponent, data: {titulo: 'Buscador'}},
    //         //Mantenimientos
    //         {
    //             path:'usuarios', 
    //             component: UsuariosComponent, 
    //             canActivate: [AdminGuard],
    //             data: {titulo: 'Mantenimiento de Usuarios'}
    //         },
    //         {path:'hospitales', component: HospitalComponent, data: {titulo: 'Mantenimiento de Hospitales'}},
    //         {path:'medicos', component: MedicosComponent, data: {titulo: 'Mantenimiento de Medicos'}},
    //         {path:'medico/:id', component: MedicoComponent, data: {titulo: 'Actualizar Medico'}},
    //         {path:'', redirectTo:'/dashboard', pathMatch:'full'},
    //     ]
    // },
];

export const PAGES_ROUTING = RouterModule.forChild(PAGES_ROUTES);