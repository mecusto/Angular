import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { PaisService } from '../../services/pais.service';

@Component({
  selector: 'app-template',
  templateUrl: './template.component.html',
  styleUrls: ['./template.component.css']
})
export class TemplateComponent implements OnInit {

  usuario = {
    nombre: 'esther',
    apellido: 'custodio',
    email: 'mecustodio@hotmail.es',
    pais: '',
    genero: ''
  };
  paises: any[] = [];


  constructor(private paisService: PaisService) { }

  ngOnInit() {
    this.paisService.getPaises()
    .subscribe(paises => {
      this.paises = paises;
      this.paises.unshift({
        nombre: '[Seleccione país]',
        codigo: ''
      })
    });
  }

  guardar(forma: NgForm) {
    if (!forma.invalid) {
      console.log(forma);
    } else {
      Object.values(forma.controls).forEach(control => {
        control.markAsTouched();
      });
    }

  }
}
