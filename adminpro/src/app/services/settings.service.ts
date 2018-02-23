import { Injectable, Renderer2 } from '@angular/core';

@Injectable()
export class SettingsService {

  constructor(private renderer: Renderer2) { 
    this.cargarAjustes();//cargan los ajustes automaticamente, ya el servicio esta inyectado en el app.component.ts
  }

  ajustes: Ajustes= {
    temaUrl: 'assets/css/colors/default.css',
    tema: 'default'
  }

  guardarAjustes(){
    console.log('Guardado en el localStorage');
    localStorage.setItem('ajustes',JSON.stringify(this.ajustes));
  }

  cargarAjustes(){
    if(localStorage.getItem('ajustes')){
      this.ajustes = JSON.parse(localStorage.getItem('ajustes'));
      console.log('Cargando desde el localStorage');
      this.aplicarTema(this.ajustes.tema);//tema por defecto al cargar default.

    }else{
      console.log('Ajustes por defecto');
      this.aplicarTema(this.ajustes.tema);//tema por defecto al cargar default.
    }
  }

  aplicarTema(tema:string){

    let url = `assets/css/colors/${tema}.css`;
    //document.getElementById('theme').setAttribute('href',url);//theme es el id en el index.html //BAD PRACTICE
    this.renderer.setAttribute(document.getElementById('theme'),'href',url);

    this.ajustes.tema = tema;
    this.ajustes.temaUrl = url;

    this.guardarAjustes();
  }

}
    interface Ajustes{
      temaUrl: string,
      tema: string
    }
