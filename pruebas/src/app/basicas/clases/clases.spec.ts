import { Jugador } from './clases';


describe( 'Pruebas de clase', () => {

    // const jugador = new Jugador();
    let jugador: Jugador;

    //se dispara antes que todas
    beforeAll( () => {
        // console.warn('BeforeAll');
        // jugador.hp = 100;
    });

    //antes que cada una de las pruebas
    beforeEach( () => {
        // console.warn('BeforeEach');
        // jugador.hp = 100;
        jugador = new Jugador();
    });

    //despues de todas las pruebas
    afterAll( () => {
        // console.warn('AfterAll');
    });

    //despues de cada una de las pruebas
    afterEach( () => {
        // console.warn('AfterEach');
        // jugador.hp = 100;
    });

    it( 'Debe de retornar 80 de hp, si recibe 20 de daño', () => {

        // const jugador = new Jugador();
        const resp = jugador.recibeDanio(20);

        expect( resp ).toBe(80);
    });

    it( 'Debe de retornar 50 de hp, si recibe 50 de daño', () => {

        // const jugador = new Jugador();
        const resp = jugador.recibeDanio(50);

        expect( resp ).toBe(50);
    });


    it( 'Debe de retornar 0 de hp, si recibe 100 de daño o más', () => {

        // const jugador = new Jugador();
        const resp = jugador.recibeDanio(100);

        expect( resp ).toBe(0);
    });

});
