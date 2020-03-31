import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { IGame } from 'src/app/interfaces/interfaces';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {

  juegos: any[] = [];

  constructor(private db: AngularFirestore) { }

  ngOnInit() {
    this.db.collection('goty').valueChanges()
      .pipe(
        map( (res: IGame[]) => res.map(
          ({ name, votos}) => ({ name, value: votos })
        )
      ))
      .subscribe( juegos => {
        this.juegos = juegos;
    });
  }

}
