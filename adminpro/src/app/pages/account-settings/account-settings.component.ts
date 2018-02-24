import { Component, OnInit, Inject, ElementRef, Renderer2,  Input, ViewChild } from '@angular/core';
//import { DOCUMENT } from '@angular/platform-browser';

//Service
import { SettingsService } from '../../services/service.index';

@Component({
  selector: 'app-account-settings',
  templateUrl: './account-settings.component.html',
  styles: []
})
export class AccountSettingsComponent implements OnInit {

  @ViewChild('selector') selector:ElementRef;
  constructor(public renderer: Renderer2,
              public _settingService: SettingsService
     // @Inject(DOCUMENT) private _document
  ) { }

  ngOnInit() {
    this.colocarCheck();
  }

  cambiarColor( tema:string, link:any ){

    this.cambiarCheck(link);
    this._settingService.aplicarTema(tema);
  
  }

  cambiarCheck( link: ElementRef ){
   
    let selectores = this.renderer.selectRootElement(document.getElementsByClassName('selector'));

    //se remueve el check existente de la lista, la clase working es el check en el tema.
    for (let ref of selectores) {
      //ref.classList.remove('working');//BAD PRACTICE
      this.renderer.removeClass(ref,'working');
    }
    //se agrega el check al nuevo tema seleccionado
    this.renderer.addClass(link, 'working');
    //link.classList.add('working');//BAD PRACTICE
  }

  //para cuando se recargue la pagina saber donde poner el check
  colocarCheck(){

    let selectores:any = document.getElementsByClassName('selector');
    let tema = this._settingService.ajustes.tema;
    for (let ref of selectores) {
      if(ref.getAttribute('data-theme') === tema){
          ref.classList.add('working');
          break;
      }
    }
  }
}
