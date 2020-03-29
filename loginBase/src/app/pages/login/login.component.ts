import { Component, OnInit } from '@angular/core';
import { UsuarioModel } from 'src/app/models/usuario.model';
import { NgForm } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';
import { flattenStyles } from '@angular/platform-browser/src/dom/dom_renderer';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  usuario: UsuarioModel;
  recordarme = false;

  constructor(private auth: AuthService,
              private router: Router) {
    this.usuario = new UsuarioModel();
   }

  ngOnInit() {
    if (localStorage.getItem('email')) {
      this.usuario.email = localStorage.getItem('email');
      this.recordarme = true;
    }
  }

  login(loginForm: NgForm) {
    if (loginForm.valid) {
      Swal.fire({
        allowOutsideClick: false,
        icon: 'info',
        text: 'Espere por favor...'
      });
      Swal.showLoading();

      this.auth.login(this.usuario)
        .subscribe( response => {
          console.log(response);
          Swal.close();

          if (this.recordarme) {
            localStorage.setItem('email', this.usuario.email);
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
