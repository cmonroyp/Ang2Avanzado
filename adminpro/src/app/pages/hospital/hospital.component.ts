import { Component, OnInit, ViewChild } from '@angular/core';
//servicio
import { HospitalService, UsuarioService } from '../../services/service.index';
//model
import { Hospital } from '../../models/hospital.model';
//Modal imagen
import { ModalUploadComponent } from '../../components/modal-upload/modal-upload.component';

 declare var swal: any;

@Component({
  selector: 'app-hospital',
  templateUrl: './hospital.component.html',
  styles: []
})
export class HospitalComponent implements OnInit {

  hospitales: Hospital[]= [];
  desde:number = 0;
  totalRegistros:number = 0;

  cargando: boolean = true;
  hospitalName:string;
  //modal subir imagen
  @ViewChild(ModalUploadComponent) infoModal: ModalUploadComponent;
  
  constructor(public _hospitalService: HospitalService ) { }

  ngOnInit() {
    this.cargarHospitales();
  }

  buscarHospital( termino : string ){

    this.cargando = true;
    this._hospitalService.inputBuscarHospitales( termino )
        .subscribe((usuarios: Hospital[])=>{
          this.hospitales = usuarios;
          this.cargando = false;
        });
  }

  cargarHospitales(){

    this.cargando = true;
    this._hospitalService.cargarHospitales( this.desde )
        .subscribe((resp:any)=>{
          console.log(resp)
          this.cargando = false;
          this.hospitales = resp.hospitales;
          this.totalRegistros = resp.total;
        });
  }

  cambiarPagina( valor: number ) {

    let desde = this.desde + valor;

    if ( desde >= this.totalRegistros ) {
      return;
    }

    if ( desde < 0 ) {
      return;
    }

    this.desde += valor;
    this.cargarHospitales();

  }

  actualizarHospital(hospital: Hospital){

    this._hospitalService.actualizarHospital(hospital)
        .subscribe(()=>{
          this.cargarHospitales();
        });
  }

  borraHospital( hospital_id: string ){

    this._hospitalService.borrarHospital( hospital_id )
        .subscribe(()=>{
          this.cargarHospitales();
        });
  }

  crearHospital(){

    swal({
      title: 'Crear hospital',
      text: 'Ingrese el nombre del hospital',
      content: 'input',
      icon: 'info',
      buttons: true,
      dangerMode: true
    }).then( (valor: string ) => {

      if ( !valor || valor.length === 0 ) {
        return;
      }

      this._hospitalService.crearHospital( valor )
          .subscribe(()=>{
            this.cargarHospitales();
          })
    });
  }

  imagenSubir(hospital_id: any){

    this.infoModal.id =  hospital_id;
    this.infoModal.tipo = 'hospitales'
    // console.log(imagen)
  }

  notification(info){
    if(info.ok){
      this.cargarHospitales();
      console.log('Respuesta del hijo',info.ok);
    }
  }

}
