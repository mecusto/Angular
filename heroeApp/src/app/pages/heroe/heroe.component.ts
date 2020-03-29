import { Component, OnInit } from '@angular/core';
import { HeroeModel } from 'src/app/models/heroe.model';
import { NgForm } from '@angular/forms';
import { HeroesService } from '../../services/heroes.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-heroe',
  templateUrl: './heroe.component.html',
  styleUrls: ['./heroe.component.css']
})
export class HeroeComponent implements OnInit {

  heroe = new HeroeModel();
  constructor(private heroeSer: HeroesService) { }

  ngOnInit() {
  }

  guardar(form: NgForm) {
    let peticion: Observable<any>;

    if (!form.invalid) {
      if(this.heroe.id) {
        peticion = this.heroeSer.actualizarHeroe(this.heroe);
      } else {
        peticion = this.heroeSer.crearHeroe(this.heroe);
      }
      peticion.subscribe(response => {
        // swall
      });
      }
  }
}
