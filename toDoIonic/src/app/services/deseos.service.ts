import { Injectable } from '@angular/core';
import { Lista } from '../models/lista.model';

@Injectable({
  providedIn: 'root'
})
export class DeseosService {

  listas: Lista[] = [];


  constructor() {
    this.cargarStorage();
   }

   crearLista(titulo: string) {
     const nuevaLista = new Lista(titulo);
     this.listas.push(nuevaLista);
     this.guardarStorage();
     return nuevaLista.id;
   }

   borrarLista(lista: Lista) {
     this.listas = this.listas.filter((listData: Lista) => listData.id !== lista.id);
     this.guardarStorage();
   }

   cargarLista(id: string | number) {
     id = Number(id);
     return this.listas.find((listaData: Lista) => listaData.id === id);
  }

   guardarStorage() {
      localStorage.setItem('listas', JSON.stringify(this.listas));
   }

   cargarStorage() {
     if (localStorage.getItem('listas')) {
      this.listas = JSON.parse(localStorage.getItem('listas'));
     } else {
      this.listas = [];
     }
   }


}
