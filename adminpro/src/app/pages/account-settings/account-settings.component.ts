import { Component, OnInit, Inject, ElementRef, Renderer2,  Input, ViewChild } from '@angular/core';
//import { DOCUMENT } from '@angular/platform-browser';

//Service
import { SettingsService } from '../../services/settings.service';

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
}
