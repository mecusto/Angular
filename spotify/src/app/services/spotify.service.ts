import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root' // forma automática de importar servicios
})
export class SpotifyService {

  constructor( private http: HttpClient) {

  }


  getQuery( query: string) {
    const url = `https://api.spotify.com/v1/${query}`;

    const headers = new HttpHeaders({
      Authorization: 'Bearer BQAZO7cekaTWdN6QQCgaXhUPwzcNzrg4_5LJMl9sRnDt0659S5AT7icK--cN7U5unhayLPe_PVogOJKoKyE',
    });

    return this.http.get(url, { headers });

  }

  getNewReleases() {
    return this.getQuery('browse/new-releases?limit=20')
      // tslint:disable-next-line: no-string-literal
      .pipe( map( data => data['albums'].items ));
  }

  getArtists(termino: string) {
    return this.getQuery(`search?q=${termino}&type=artist&limit=15`)
      // tslint:disable-next-line: no-string-literal
      .pipe ( map( data => data['artists'].items));
  }

  getArtist(id: string) {
    return this.getQuery(`artists/${id}`);
  }

  getTracks(id: string) {
    return this.getQuery(`artists/${id}/top-tracks?country=us`)
      // tslint:disable-next-line: no-string-literal
      .pipe ( map( data => data['tracks']));
  }


}
