import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule,  ReactiveFormsModule } from '@angular/forms';

//modules 
// import { PagesModule } from './pages/pages.module';

//componentes 
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './login/register.component';

//rutas Principales
import { APP_ROUTING } from './app.routing';
//Servicios
import { ServicesModule } from './services/services.module';
import { PagesComponent } from './pages/pages.component';
import { SharedModule } from './shared/shared.module';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    PagesComponent

  ],
  imports: [
    BrowserModule,
    APP_ROUTING,
    // PagesModule,
    FormsModule,
    ReactiveFormsModule,
    ServicesModule,
    SharedModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
