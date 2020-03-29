import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { UsuarioModel } from 'src/app/models/usuario.model';
import { AuthService } from '../../services/auth.service';


@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  usuario: UsuarioModel;
  recordarme = false;

  constructor(private auth: AuthService,
              private router: Router) { }

  ngOnInit() {
    this.usuario = new UsuarioModel();
   }

   onSubmit(registroForm: NgForm) {
     if (registroForm.valid) {

      Swal.fire({
        allowOutsideClick: false,
        icon: 'info',
        text: 'Espere por favor...'
      });
      Swal.showLoading();

      this.auth.registrar(this.usuario)
       .subscribe( response => {
        Swal.close();

        if (this.recordarme) {
          localStorage.setItem('email', this.usuario.email)
        }
        this.router.navigateByUrl('/home');

      } , err => {
          console.log(err.error.error.message);
          Swal.fire({
            icon: 'error',
            title: 'Error al autenticar',
          });
      });
     }
   }


}
