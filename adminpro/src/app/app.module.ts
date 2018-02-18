import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


//modules 
import { PagesModule } from './pages/pages.module';

//componentes 
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './login/register.component';

//rutas Principales
import { APP_ROUTING } from './app.routing';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent
  ],
  imports: [
    BrowserModule,
    APP_ROUTING,
    PagesModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
