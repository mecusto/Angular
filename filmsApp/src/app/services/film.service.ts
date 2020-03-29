import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpClientModule} from '@angular/common/http';

import { Jsonp } from '@angular/common'; // sustituye a http para llamadas asíncronas de dominios distintos
import { Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators';


@Injectable()
export class PeliculasService {

  private apikey: string = '713b84124cc60c34725595ae1e2ee5fa';
  private urlMoviedb: string = 'https://api.themoviedb.org/3';

  peliculas: any[] = [];

  constructor( private http: HttpClient ) { }


  getCartelera(){

    const desde = new Date();
    const hasta = new Date();
    hasta.setDate( hasta.getDate() + 7 );

    const desdeStr = `${ desde.getFullYear() }-${ desde.getMonth() + 1 }-${ desde.getDate() }`;
    const hastaStr = `${ hasta.getFullYear() }-${ hasta.getMonth() + 1 }-${ hasta.getDate() }`;


    // tslint:disable-next-line: max-line-length
    const url = `${ this.urlMoviedb }/discover/movie?primary_release_date.gte=${ desdeStr }&primary_release_date.lte=${ hastaStr }&api_key=${ this.apikey }&language=es&callback=JSONP_CALLBACK`;

    return this.http.jsonp( url, 'callback'  )
                .subscribe( res => console.log(res) );

  }


  getPopulares() {

    const url = `${ this.urlMoviedb }/discover/movie?sort_by=popularity.desc&api_key=${ this.apikey }&language=es&callback=JSONP_CALLBACK`;

    return this.http.jsonp( url, 'callback' )
                .map( res => res.json().results);
  }
  
  getPopularesNinos() {

    // tslint:disable-next-line: max-line-length
    const url = `${ this.urlMoviedb }/discover/movie?certification_country=US&certification.lte=G&sort_by=popularity.desc&api_key=${ this.apikey }&language=es&callback=JSONP_CALLBACK`;

    return this.jsonp.get( url )
                .map( res => res.json().results);
  }

  buscarPelicula( texto: string ) {

    // tslint:disable-next-line: max-line-length
    const url = `${ this.urlMoviedb }/search/movie?query=${ texto }&sort_by=popularity.desc&api_key=${ this.apikey }&language=es&callback=JSONP_CALLBACK`;


    return this.jsonp.get( url )
                .map( res => {
                  this.peliculas = res.json().results;
                  console.log(this.peliculas);
                  return res.json().results;
                });
  }

  getPelicula( id: string ) {

    const url = `${ this.urlMoviedb }/movie/${ id }?api_key=${ this.apikey }&language=es&callback=JSONP_CALLBACK`;

    return this.jsonp.get( url )
                .map( res => res.json());
  }



}
