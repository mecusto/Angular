import { Component, OnInit } from '@angular/core';
import { PeliculasService } from 'src/app/services/film.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  cartelera: any;
  populares: any;
  popularesNinos: any;

  constructor( public _ps: PeliculasService ) {

    this._ps.getCartelera()
        .subscribe( data => this.cartelera = data );

    this._ps.getPopulares()
        .subscribe( data => this.populares = data );

    this._ps.getPopularesNinos()
        .subscribe( data => this.popularesNinos = data );

  }


  ngOnInit() {
  }

}
