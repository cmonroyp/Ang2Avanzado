import { Component, OnInit } from '@angular/core';
import { Router, ActivationEnd } from '@angular/router';
import { filter, map } from 'rxjs/operators';
import { Title, Meta, MetaDefinition } from '@angular/platform-browser';

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styles: []
})
export class BreadcrumbsComponent implements OnInit {

  pageTitle:string;
  constructor(private router: Router,
              public _title: Title,
              public _meta: Meta) {
    
           this.getDataRoute().subscribe((data:any)=>{
                console.log(data)
                this.pageTitle = data.titulo;
                this._title.setTitle(this.pageTitle);//titulo en el browser

                //https://www.w3schools.com/tags/tag_meta.asp
                //https://angular.io/api/platform-browser/Meta
                let metaTag: MetaDefinition ={
                  name: 'descripcion',
                  content: this.pageTitle
                }

                this._meta.updateTag(metaTag);
              })
   }

   getDataRoute(){
     
    return   this.router.events
                .pipe(
                  filter(evento=> evento instanceof ActivationEnd),
                  filter((evento:ActivationEnd) => evento.snapshot.firstChild === null),
                  map((evento:ActivationEnd)=>{
                    return evento.snapshot.data;
                  })
                )
   }

  ngOnInit() {
  }

}
