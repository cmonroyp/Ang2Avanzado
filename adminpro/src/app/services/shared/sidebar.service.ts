import { Injectable } from '@angular/core';

@Injectable()
export class SidebarService {

  menu:Array<any> =[
    {
      titulo: 'Principal',
      icono: 'mdi mdi-gauge',
      subMenu:[
        { titulo: 'Dashboard', url: '/dashboard' },
        { titulo: 'Progress', url: '/progress' },
        { titulo: 'Graficas1', url: '/graficas1' }
      ]
    }
  ];
  constructor() { }

}
