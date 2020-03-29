import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import * as firebase from 'firebase/app';
import { FileItem } from '../models/file-item';
import { AngularFireStorage } from '@angular/fire/storage';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';



@Injectable({providedIn: 'root'})

export class CargaImagenesService {

  private CARPETA_IMG = 'img'; // donde vamos a guardar las imágenes
  uploadPercent: Observable<number>;


  constructor(private db: AngularFirestore,
              private storage: AngularFireStorage) { }

  // método para guardar en firebase

  private guardarImg(imagen: { nombre: string, url: string }) {
    this.db.collection(`/${this.CARPETA_IMG}`).add(imagen);
  }

  cargarImagenesFirebase( imagenes: FileItem[] ) {

    const storageRef = firebase.storage().ref();

    for ( const item of imagenes ) {

      item.estaSubiendo = true;
      if ( item.progreso >= 100 ) {
        continue;
      }

      const uploadTask: firebase.storage.UploadTask =
                  storageRef.child(`${ this.CARPETA_IMG }/${ item.nombreArchivo }`)
                            .put( item.archivo );

      uploadTask.on( firebase.storage.TaskEvent.STATE_CHANGED,
              ( snapshot: firebase.storage.UploadTaskSnapshot ) => {
                item.progreso = ( snapshot.bytesTransferred / snapshot.totalBytes ) * 100;
                snapshot.ref.getDownloadURL().then( url => item.url = url);
              },
              ( error ) => console.error('Error al subir', error ),
              () => {

                console.log('Imagen cargada correctamente');
 
                item.estaSubiendo = false;
                console.log(item.nombreArchivo + ' ' + item.url);
                this.guardarImg({
                  nombre: item.nombreArchivo,
                  url: item.url
                });

              });


    }

  }

  // cargarImagenesFirebase(img: FileItem[]) {
  //   const storageRef = firebase.storage().ref();

  //   for (const item of img) {
  //     console.log('entro en el for');
  //     item.estaSubiendo = true;
  //     if (item.progreso >= 100) {
  //       continue;
  //     }
  //     const uploadTask: firebase.storage.UploadTask = storageRef
  //       .child(`${this.CARPETA_IMG}/${item.nombreArchivo}`)
  //       .put(item.archivo);

  //     // la linea inferior se disparará cada vez que el estado cambie
  //     uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED,
  //       (snapshot) => item.progreso = (snapshot.bytesTransferred / snapshot.totalBytes) * 100,
  //       (error) => console.error('Error al subir el archivo', error),
  //       () => {
  //           console.log('Imagen cargada correctamente');
  //           // tslint:disable-next-line: deprecation
  //           item.url = uploadTask.snapshot.downloadURL;
  //           item.estaSubiendo = false;

  //           this.guardarImg({
  //             nombre: item.nombreArchivo,
  //             url: item.url
  //           });
  //         }
  //       );
  //     }
  // }

  // cargarImgFireStorage(imgs: FileItem[]) {
  //   console.log('estoy en imgFireStorage');

  //   for (const item of imgs) {
  //     console.log('entro en el for');
  //     item.estaSubiendo = true;
  //     const filePath = `${this.CARPETA_IMG}/${item.nombreArchivo}`;
  //     const ref = this.storage.ref(filePath);
  //     const task = ref.put(item.archivo);

  //     // observe percentage changes
  //     this.uploadPercent = task.percentageChanges();
  //     // get notified when the download URL is available
  //     task.snapshotChanges().pipe(
  //         finalize(() => {
  //           console.log('Imagen cargada correctamente');
  //         // tslint:disable-next-line: deprecation
  //           // item.url = uploadTask.snapshot.downloadURL;
  //           item.estaSubiendo = false;

  //           this.guardarImg({
  //             nombre: item.nombreArchivo,
  //             url: item.url
  //           });
  //         })
  //        )
  //       .subscribe();
  //   }
  // }
}
