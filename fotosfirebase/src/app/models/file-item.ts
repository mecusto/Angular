export class FileItem {

  public archivo: File;
  public nombreArchivo: string;
  public url: string;
  public estaSubiendo: boolean;
  public progreso: number; // porcentaje de carga

  constructor(archivo: File) {

    this.archivo = archivo;
    this.nombreArchivo = archivo.name;

    this.estaSubiendo = false;
    this.progreso = 0;
  }
}