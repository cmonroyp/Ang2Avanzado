import { Component } from '@angular/core';
//Service 
import { SettingsService } from './services/service.index';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers:[SettingsService]
})
export class AppComponent {
  title = 'app';

  constructor(public _sttingService: SettingsService){

  }
}
