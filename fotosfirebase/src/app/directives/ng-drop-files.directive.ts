import { Directive, EventEmitter, ElementRef,
   HostListener, Input, Output } from '@angular/core';
import { FileItem } from '../models/file-item';

@Directive({
  selector: '[appNgDropFiles]'
})

// An Attribute directive changes the appearance or behavior of a DOM element.

export class NgDropFilesDirective {

  @Input() archivos: FileItem[] = [];

  // emito un evento llamado mouseSobre
  @Output() mouseSobre: EventEmitter<boolean> = new EventEmitter();

  constructor() { }

// Eventos

  @HostListener('dragover', ['$event'])
  public onDragEnger(event: any) {
    this.mouseSobre.emit(true);
    this._prevenirDetener(event);
  }

  @HostListener('dragleave', ['$event'])
  public onDragLeave(event: any) {
    this.mouseSobre.emit(false);
    this._prevenirDetener(event);
  }

  @HostListener('drop', ['$event'])
  public onDrop(event: any) {
    const transferencia = this._getTransferencia(event);

    if (!transferencia) {
      return;
    }

    this._extraerArchivos(transferencia.files);
    this._prevenirDetener(event);
    this.mouseSobre.emit(false);
  }

  private _extraerArchivos(archivoLista: FileList) {
    console.log(archivoLista);
    // tslint:disable-next-line: one-line
    // tslint:disable-next-line: forin
    for (const propiedad in Object.getOwnPropertyNames(archivoLista)){
      const archivoTemp = archivoLista[propiedad];

      if (this._archivoPuedeSerCargado(archivoTemp)) {
        const nuevoArchivo = new FileItem(archivoTemp);
        this.archivos.push(nuevoArchivo);
      }
    }
    console.log(this.archivos);
  }

  // para extender la compatibilidad entre navegadores
  private _getTransferencia(event: any) {
    return event.dataTransfer ? event.dataTransfer : event.originalEvent.dataTransfer;
  }


  // Validaciones

  private _archivoPuedeSerCargado(archivo: File): boolean {
    if (!this._archivoYaFueDroppeado(archivo.name) && this._esImg(archivo.type)) {
      return true;
    } else {
      return false;
    }
  }

  private _prevenirDetener(event) {
    event.preventDefault();
    event.stopPropagation();
  }

  // validar que el archivo no esté ya en el array de archivos
  private _archivoYaFueDroppeado(nombreArchivo: string): boolean {
    for (const archivo of this.archivos) {
      if (archivo.nombreArchivo === nombreArchivo) {
        console.log('l archivo ' + nombreArchivo + ' ya está agregado');
        return true;
      }
    }
    return false;
  }

  // Validar que el archivo es una imagen
  private _esImg(tipoArchivo: string): boolean {
    return (tipoArchivo === '' || tipoArchivo === undefined) ? false : tipoArchivo.startsWith('image');
  }


}
