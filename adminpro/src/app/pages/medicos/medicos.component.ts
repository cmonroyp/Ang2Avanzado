import { Component, OnInit } from '@angular/core';
import { MedicoService } from '../../services/service.index';
//model
import { Medico } from '../../models/medico.model';

@Component({
  selector: 'app-medicos',
  templateUrl: './medicos.component.html',
  styles: []
})
export class MedicosComponent implements OnInit {

  medicos: Medico[] =[];
  totalRegistros:number = 0;

  cargando: boolean = true;
  constructor(public _medicoService: MedicoService) { }

  ngOnInit() {

    this.cargarMedicos();
  }

  buscarMedico( termino : string ){

    this.cargando = true;
    this._medicoService.inputBuscarMedicos( termino )
        .subscribe((medicos: Medico[])=>{
          this.medicos = medicos;  
          this.cargando = false;
        });
  }

  cargarMedicos(){

    this.cargando = true;
    this._medicoService.cargarMedicos()
        .subscribe((resp:any)=>{
          console.log(resp)
          this.cargando = false;
          this.medicos = resp.medicos;
          this.totalRegistros = resp.total;
        });
  }

  borrarMedico( medico ){
    
  }


}
