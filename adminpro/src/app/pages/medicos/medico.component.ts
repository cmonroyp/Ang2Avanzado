import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit, ViewChild } from '@angular/core';
//service
import { HospitalService, MedicoService } from '../../services/service.index';
//model
import { Hospital } from '../../models/hospital.model';
import { Medico } from '../../models/medico.model';
//modal de imagen
import { ModalUploadComponent } from '../../components/modal-upload/modal-upload.component';

@Component({
  selector: 'app-medico',
  templateUrl: './medico.component.html',
  styles: []
})
export class MedicoComponent implements OnInit {

  hospitales: Hospital[]= [];
  hospital: Hospital = new Hospital('');
  medico: Medico = new Medico('','','','','');

  //modal subir imagen
  @ViewChild(ModalUploadComponent) infoModal: ModalUploadComponent;
  
  constructor( public _hospitalService: HospitalService,
               public _medicoService: MedicoService,
               private _router: Router,
               private activateRoute: ActivatedRoute ) {

                activateRoute.params.subscribe( (params)=>{

                  let id = params['id'];
                  if( id != 'nuevo' ){
                    this.cargarMedico( id );
                  }
                })
          }

  ngOnInit() {    
    this.cargarHospitales();
  }

  cargarHospitales(){

    this._hospitalService.getAllHospitals()
        .subscribe((res:any)=>{
          console.log(res)
          this.hospitales = res.hospitales;
        });
  }

  guardarMedico( f:NgForm ){
    // console.log(f.valid);
    // console.log(f.value)

    if( f.invalid ){
      return;
    }

    this._medicoService.guardarMedico( this.medico )
        .subscribe((medico)=>{
          this.medico._id = medico._id;
          this._router.navigate(['/medico', medico._id ] );
        })
  }

  cambioHospital( id: string ){

    this._hospitalService.buscarHospital_Id( id )
        .subscribe((resp)=>{
           this.hospital = resp.hospital;
        })
  }

  cargarMedico( id: string ){

    this._medicoService.buscarMedico_Id( id )
        .subscribe((medico)=>{
          console.log('medico por id',medico)
          this.medico = medico;
          this.medico.hospital = medico.hospital._id;
          this.cambioHospital(this.medico.hospital);
        })
  }


  cambiarFoto(medico_id: string){

    this.infoModal.id =  medico_id;
    this.infoModal.tipo = 'medicos'
    // console.log(imagen)
  }

  notification(info){
    if(info.ok){
      this.cargarMedico( this.medico._id );
      console.log('Respuesta del hijo',info.ok);
    }
  }

  cambiarFotoHospital( hospital_id: string ){
    this.infoModal.id =  hospital_id;
    this.infoModal.tipo = 'hospitales'

    this.cambioHospital( hospital_id )
    // console.log(hospital_id)
  }
}
