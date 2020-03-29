import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HeroeModel } from '../models/heroe.model';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HeroesService {

  private url: string = '';

  constructor(private http: HttpClient) { }

  crearHeroe(heroe: HeroeModel) {
    return this.http.post(`${this.url}/heroes.json`, heroe)
    .pipe(
      map( (response: any) => {
        heroe.id = response.name;
        return heroe;
      })
    );
  }

  actualizarHeroe(heroe: HeroeModel) {
    const { id, ...auxHeroe } = heroe;
    console.log(auxHeroe);
    return this.http.put(`${this.url}/heroes/${heroe.id}`, auxHeroe);
  }
}
