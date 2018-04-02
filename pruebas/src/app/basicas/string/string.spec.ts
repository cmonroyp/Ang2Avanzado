import { mensaje } from "./string";

describe(' pruebas de estrings',() =>{

    it( 'debe regresar un string', ()=>{

       let resp =  mensaje('Carlos Mario');
       expect( typeof resp).toBe('string');
    });

    it( 'Debe de retornar un saludo con el nombre enviado', () => {

        const nombre = 'Juan';
        const resp = mensaje( nombre );

        expect( resp ).toContain( nombre );

    });
    
})