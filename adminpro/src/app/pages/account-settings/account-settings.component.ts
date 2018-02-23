import { Component, OnInit, Inject, ElementRef, Renderer2,  Input, ViewChild } from '@angular/core';
 //import { DOCUMENT } from '@angular/platform-browser';

@Component({
  selector: 'app-account-settings',
  templateUrl: './account-settings.component.html',
  styles: []
})
export class AccountSettingsComponent implements OnInit {

  @ViewChild('selector') selector:ElementRef;
  constructor(private renderer: Renderer2
     // @Inject(DOCUMENT) private _document
  ) { }

  ngOnInit() {
  }

  cambiarColor( tema:string, link:ElementRef ){

    this.cambiarCheck(link);

    let url = `assets/css/colors/${tema}.css`
    //document.getElementById('theme').setAttribute('href',url);//theme es el id en el index.html //BAD PRACTICE
    this.renderer.setAttribute(document.getElementById('theme'),'href',url);

  }

  cambiarCheck( link: ElementRef ){
   
    let selectores = this.renderer.selectRootElement(document.getElementsByClassName('selector'));

    //se remueve el check existente de la lista, la clase working es el check en el tema.
    for (let ref of selectores) {
      //ref.classList.remove('working');//BAD PRACTICE
      this.renderer.removeClass(ref,'working');
    }
    //se agrega el check al nuevo tema seleccionado
    this.renderer.addClass(link, 'working')
    //link.classList.add('working');//BAD PRACTICE
  }
}
