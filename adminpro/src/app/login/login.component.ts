import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
//llamar inicializaciones que estan fuera de angular como jquery
declare function init_pluings();

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private _router: Router) { }

  ngOnInit() {
    init_pluings();//se inicializan todos los pluings del sitio Web, que estan en el index.html como 'assets/js/custom.js'
  }

  ingresar(){
    console.log('login')
    this._router.navigate(['/dashboard']);
  }
}
