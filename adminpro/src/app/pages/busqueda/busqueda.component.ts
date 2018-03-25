import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AppSettings } from '../../config/config.api';
import { map } from 'rxjs/operators';
//modelos
import { Usuario } from '../../models/usuario.model';
import { Hospital } from '../../models/hospital.model';
import { Medico } from '../../models/medico.model';

@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.component.html',
  styles: []
})
export class BusquedaComponent implements OnInit {

  public url: string;
  public token: string;

  usuarios: Usuario[] = [];
  hospitales: Hospital[] = [];
  medicos: Medico[] = [];

  constructor(public activateRoute: ActivatedRoute,
              public http: HttpClient) {

      this.url = AppSettings.API_ENDPOIND;
      this.token = localStorage.getItem('token');

       activateRoute.params.subscribe( (params)=>{
         let termino = params['termino'];
         this.buscar( termino );
        //  console.log(termino);
      });

   }

  ngOnInit() {
  }

  buscar( termino: string ){

    let headers = new HttpHeaders({'Content-Type':'application/json',
                                    'Authorization': this.token })
     this.http.get(`${this.url}todo/${termino}`,{headers})
              .subscribe((resp:any)=>{
                console.log(resp);
                this.usuarios = resp.usuarios;
                this.medicos = resp.medicos;
                this.hospitales = resp.hospitales;
              })
  }
}
