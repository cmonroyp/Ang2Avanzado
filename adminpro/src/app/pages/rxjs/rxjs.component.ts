import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { map, filter, retry, catchError } from 'rxjs/operators';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styles: []
})
export class RxjsComponent implements OnInit {

  public sub = new Subscription;
  constructor() { 


   this.sub = this.observables().subscribe(
          numero =>console.log('sub', numero),
          error => console.log('Error en el Obs', error),
         ()=> console.log('El observador Termino!.')
    )

  }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
    
  }

  observables():Observable<any>{
    return new Observable( (observer)=>{

      let contador = 0;
      let interval = setInterval(() => {

                        contador += 1
                        let salida ={
                          valor: contador
                        }
                         observer.next(salida);
                        // if(contador === 5){
                        //   clearInterval(interval);
                        //   observer.complete();
                        // }

                        // if(contador === 4){
                        //   clearInterval(interval);
                        //   observer.error('Auxilio!.');
                        // }
                  },500);
    }).pipe(
      retry(2),
      map((res:any)=>{
        return res.valor;
      }),
      filter(valor=>{
      
        if((valor % 2) === 1){
          //impar 
          return true;
        }else{
          //par 
          return false;
        }
      })
    )
  }
}
