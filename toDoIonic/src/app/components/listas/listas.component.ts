import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { DeseosService } from '../../services/deseos.service';
import { Lista } from 'src/app/models/lista.model';
import { Router } from '@angular/router';
import { AlertController, IonListHeader, IonList } from '@ionic/angular';

@Component({
  selector: 'app-listas',
  templateUrl: './listas.component.html',
  styleUrls: ['./listas.component.scss'],
})

export class ListasComponent implements OnInit {

  @Input() terminada = true;
  @ViewChild(IonList, {static: false} ) lista: IonList;

  constructor(public deseosService: DeseosService,
              private router: Router,
              private alertController: AlertController) { }

  ngOnInit() {}


  listaSeleccionada(lista: Lista) {
    if (this.terminada) {
      this.router.navigateByUrl(`/tabs/tab2/agregar/${lista.id}`);
    } else {
      this.router.navigateByUrl(`/tabs/tab1/agregar/${lista.id}`);
    }
  }

  borrarLista(lista: Lista) {
    this.deseosService.borrarLista(lista);
    this.lista.closeSlidingItems();
  }

  async editLista(lista: Lista) {
    const alert = await this.alertController.create({
      header: 'Editar lista',
      inputs: [
        {
          name: 'titulo',
          type: 'text',
          value: lista.title,
          placeholder: 'Nombre de la lista'
        }
      ],
      buttons: [
        {
          text: 'Cancelar',
      role: 'cancel',
      handler: () => this.lista.closeSlidingItems()
    },
    {
      text: 'Actualizar',
      handler: (data) => {
        if (data.titulo.length === 0) {
          return;
        }
        lista.title = data.titulo;
        this.deseosService.guardarStorage();
        this.lista.closeSlidingItems();
      }
    }
  ]
    });
    alert.present();
  }

}

