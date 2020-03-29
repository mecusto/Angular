import { Component } from '@angular/core';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  nombre = 'Capitan América';
  nombre2 = 'esTHeR cUstoDio ViLLoria';
  array: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  PI: number = Math.PI;
  percent = 0.234;
  salary = 12345;
  date = new Date();
  activar = true;


  idioma = 'es';
  videoUrl = 'https://www.youtube.com/embed/O4f58BU_Hbs';

  // tslint:disable-next-line: variable-name
  valorPromesa = new Promise<string>((resolve, _reject) => {
    setTimeout(() => {
      resolve('llego la data');
    }, 2500);
  });

  heroe = {
    nombre: 'logan',
    clave: 'Wolverine',
    edad: 500,
    direccion: {
      calle: 'Primera',
      casa: 20
    }
  };

  
}
