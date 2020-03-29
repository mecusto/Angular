import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SpotifyService } from '../../services/spotify.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styles: []
})
export class HomeComponent implements OnInit {
  // Intro API REST countries
  // paises: any[] = [];

  // constructor(private http: HttpClient) {
  //   this.http.get('https://restcountries.eu/rest/v2/lang/es')
  //   .subscribe( (resp: any[]) => {
  //     this.paises = resp;
  //   });
  // }
  newSongs: any[] = [];
  loading: boolean;
  error: boolean;
  mensajeError: string;

  constructor(private spotify: SpotifyService) {
    this.error = false;
    this.loading = true;
    this.spotify.getNewReleases()
    .subscribe( (data: any) => {
      this.newSongs = data;
      this.loading = false;
    }, (errorServicio) => {
      this.error = true;
      console.log(errorServicio);
      this.mensajeError = errorServicio.error.error;
    });
  }

  ngOnInit() {
  }

}
