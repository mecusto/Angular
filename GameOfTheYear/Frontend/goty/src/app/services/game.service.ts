import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { IGame } from '../interfaces/interfaces';
import { of } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class GameService {

  private juegos: IGame[] = [];

  constructor(private http: HttpClient) { }

  getNominados() {
    if (this.juegos.length === 0) {
      return this.http.get<IGame[]>(`${environment.url}/api/goty`)
      .pipe(tap(
        juegos => this.juegos = juegos
      ));
    } else {
      // si no tenemos juegos:
      return of(this.juegos); 
    }
  }

// la ff of permite devolver como observable q es lo q se espera

  postVoto(id: string) {
    return this.http.post(`${environment.url}/api/goty/${id}`, {})
      .pipe(
        catchError(err => {
          return of(err.error);
        })
      );
  }
}
