import { Component, OnInit } from '@angular/core';
import { DeseosService } from '../../services/deseos.service';
import { ActivatedRoute } from '@angular/router';
import { Lista } from 'src/app/models/lista.model';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { ListaItem } from 'src/app/models/lista-item.model';

@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.page.html',
  styleUrls: ['./agregar.page.scss'],
})
export class AgregarPage implements OnInit {

  lista: Lista;
  nombreItem: string;

  constructor(private deseosService: DeseosService,
              private router: ActivatedRoute) {

    const listaId = this.router.snapshot.paramMap.get('listaId');
    this.lista = this.deseosService.cargarLista(listaId);
  }

  ngOnInit() {
  }

  agregarItem() {
    if (this.nombreItem.length === 0 ) {
      return;
    }

    const nuevoItem = new ListaItem(this.nombreItem);
    this.lista.items.push(nuevoItem);

    this.nombreItem = '';
    this.deseosService.guardarStorage();
  }

  cambioCheck() {

    const pending = this.lista.items
        .filter(itemData => !itemData.complete).length;
    if ( pending === 0 ) {
      this.lista.ended = true;
      this.lista.endOn = new Date();
    } else {
      this.lista.ended = false;
      this.lista.endOn = null;
    }
    this.deseosService.guardarStorage();
  }

  borrar(i: number) {
    this.lista.items.splice(i, 1);
    this.deseosService.guardarStorage();
  }
}
