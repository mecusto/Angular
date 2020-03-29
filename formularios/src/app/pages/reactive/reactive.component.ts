import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { ValidadoresService } from '../../services/validadores.service';

@Component({
  selector: 'app-reactive',
  templateUrl: './reactive.component.html',
  styleUrls: ['./reactive.component.css']
})
export class ReactiveComponent implements OnInit {

  forma: FormGroup;

  validaciones = [Validators.required, Validators.minLength(1)];

  // es recomendable generar el formulario antes de cargar el componente

  constructor(private fb: FormBuilder,
              private validadores: ValidadoresService) {
    this.crearFormulario();
    this.cargarDataFormulario();
    this.crearListeners();
   }

  ngOnInit() {
  }

  get nombreNoValido() {
    return this.forma.get('nombre').invalid && this.forma.get('nombre').touched;
  }

  get apellidoNoValido() {
    return this.forma.get('apellido').invalid && 
      this.forma.get('apellido').touched;
  }

  get emailNoValido() {
    return this.forma.get('email').invalid && 
      this.forma.get('email').touched;
  }

  get distritoNoValido() {
    return this.forma.get('direccion.distrito').invalid && 
      this.forma.get('direccion.distrito').touched;
  }

  get ciudadNoValido() {
    return this.forma.get('direccion.ciudad').invalid && 
      this.forma.get('direccion.ciudad').touched;
  }

  get passwordNoValido() {
    return this.forma.get('password').invalid && 
      this.forma.get('password').touched;
  }

  get password2NoValido() {
    const pass1 = this.forma.get('password').value;
    const pass2 = this.forma.get('password2').value;

    return (pass1 === pass2) ? false : true;
  }

  // get para los formArray

  get pasatiempos() {
    return this.forma.get('pasatiempos') as FormArray;
  }

  // fb => FormBuilder
  crearFormulario() {
    this.forma = this.fb.group({
      // nombre : ['valor por defecto', validadores sincronos, validadores async]
      nombre: ['', this.validaciones ],
      apellido: ['', [...this.validaciones, this.validadores.noCustodio]],
      email: ['', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]],
      usuario: ['', , this.validadores.existeUsuario ],
      password: ['', [Validators.required]],
      password2: ['', [Validators.required]],
      direccion: this.fb.group({
        distrito: ['', this.validaciones],
        ciudad: ['', this.validaciones]
      }),
      pasatiempos: this.fb.array([])
    }, {
      // necesario para que mientras las contraseñas sean distintas el formulario no sea valido
      validators: [this.validadores.passwordsIguales('password', 'password2')]
    });

  }

  crearListeners() {
    this.forma.valueChanges
      .subscribe( valor => console.log(valor));

    this.forma.get('nombre').valueChanges
      .subscribe( valor => console.log(valor));

    this.forma.statusChanges
      .subscribe( (status) => console.log({ status }));
  }

  cargarDataFormulario() {

    // .setValue exige que todos los datos estén completados
    // this.forma.setValue({
    // .reset permite que no estén todos los datos ya que no da error
      this.forma.reset({
      nombre: 'Jose',
      apellido: 'Gutierrez',
      email: 'josegutierrez@gmail.com',
      usuario: '',
      password: '123',
      password2: '123',
      direccion: {
        ciudad: 'Madrid',
        distrito: 'Getafe'
      }
    });
      ['uno', 'dos'].forEach(valor =>
         this.pasatiempos.push( this.fb.control(valor)));
  }

  guardar() {
    if (!this.forma.invalid) {
      console.log(this.forma);
    } else {
      Object.values(this.forma.controls).forEach(control => {
        if (control instanceof FormGroup) {
          Object.values(control).forEach(c => c.markAsTouched());
        } else {
          control.markAsTouched();
        }
      });
    }
      // posteo de informacion
    this.forma.reset();
  }

  agregarPasatiempo() {
    this.pasatiempos.push(
      this.fb.control('Nuevo elemento', Validators.required));
  }

  borrarPasatiempo(i: number) {
    this.pasatiempos.removeAt(i);
  }
}
