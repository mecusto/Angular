import { Component, OnInit } from '@angular/core';
import { FileItem } from 'src/app/models/file-item';
import { CargaImagenesService } from '../../services/carga-imagenes.service';

@Component({
  selector: 'app-carga',
  templateUrl: './carga.component.html',
  styles: []
})
export class CargaComponent implements OnInit {

  archivos: FileItem[] = [];
  estaSobreDrop = false;

  // tslint:disable-next-line: variable-name
  constructor(public _cargaImgService: CargaImagenesService) { }

  ngOnInit() {
  }

  cargarImg() {
    this._cargaImgService.cargarImagenesFirebase(this.archivos);
    console.log(this.archivos);
    // this._cargaImgService.cargarImgFireStorage(this.archivos);
  }


  limpiarArchivos() {
    this.archivos = [];
  }

}
