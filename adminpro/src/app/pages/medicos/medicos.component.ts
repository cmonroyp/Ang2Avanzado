import { Component, OnInit, ViewChild } from '@angular/core';
import { MedicoService } from '../../services/service.index';
//model
import { Medico } from '../../models/medico.model';
//component modal imagen
import { ModalUploadComponent } from '../../components/modal-upload/modal-upload.component';

@Component({
  selector: 'app-medicos',
  templateUrl: './medicos.component.html',
  styles: []
})
export class MedicosComponent implements OnInit {

  medicos: Medico[] =[];
  totalRegistros:number = 0;

  cargando: boolean = true;
  //modal subir imagen
  @ViewChild(ModalUploadComponent) infoModal: ModalUploadComponent;
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

  borrarMedicos( medico_id: string ){
   
    this._medicoService.borrarMedico( medico_id )
        .subscribe(()=>{
          this.cargarMedicos();
        });
  }

  imagenSubir(medico_id: any){

    this.infoModal.id =  medico_id;
    this.infoModal.tipo = 'medicos'
    // console.log(imagen)
  }

  notification(info){
    if(info.ok){
      this.cargarMedicos();
      console.log('Respuesta del hijo',info.ok);
    }
  }


}
