import { Component, OnInit } from '@angular/core';
import { GameService } from '../../services/game.service';
import { IGame } from 'src/app/interfaces/interfaces';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-goty',
  templateUrl: './goty.component.html',
  styleUrls: ['./goty.component.css']
})
export class GotyComponent implements OnInit {

  juegos: IGame[] = [];

  constructor(private gameservice: GameService) { }

  ngOnInit() {
    this.gameservice.getNominados().subscribe( res => {
      console.log(res);
      this.juegos = res;
    });
  }

  postVoto(juego: IGame) {
    this.gameservice.postVoto(juego.id)
    .subscribe( (res: { ok: boolean, mensaje: string } ) => {
      console.log(res);
      if (res.ok) {
        Swal.fire('Gracias', res.mensaje, 'success');
      } else {
        Swal.fire('Error', res.mensaje, 'error');
      }
    });
  }

}
