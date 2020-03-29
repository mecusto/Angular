import { Injectable } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { UsuarioModel } from '../models/usuario.model';

import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private URL = 'https://identitytoolkit.googleapis.com/v1/';
  private API_KEY = 'AIzaSyBCJ2SJxsa0F90-lgSksoAAz4FP_B5vSSs';
  private EXPIRE_TIME_MILSEC = 3600000;

  userToken: string;


  // crear nuevo usuario

  // https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=[API_KEY]

  // login usuario

  // https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=[API_KEY]

  constructor(private http: HttpClient) { 
    this.getToken();
  }

  logout() {
    localStorage.removeItem('token');
  }

  login(usuario: UsuarioModel) {
    const authData = {...usuario, returnSecureToken: true };

    return this.http.post(`${this.URL}accounts:signInWithPassword?key=${this.API_KEY}`, authData).pipe(
      map( response => {
        // tslint:disable-next-line: no-string-literal
        this.setToken(response['idToken']);
        return response;
      })
    );

  }

  registrar(usuario: UsuarioModel) {
    const authData = {...usuario, returnSecureToken: true };

    return this.http.post(`${this.URL}accounts:signUp?key=${this.API_KEY}`, authData)
      .pipe(
        map( response => {
          // tslint:disable-next-line: no-string-literal
          this.setToken(response['idToken']);
          return response;
        })
      );
  }

  private setToken(idToken: string) {
    this.userToken = idToken;
    localStorage.setItem('token', idToken);

    const expiresOn = new Date().getTime() + this.EXPIRE_TIME_MILSEC;
    localStorage.setItem('expira', expiresOn.toString());

  }

  private getToken() {
    this.userToken = '';
    if (localStorage.getItem('token')) {
      this.userToken = localStorage.getItem('token');
    }
  }

  estaAuth(): boolean {
    if (this.userToken.length < 2) {
      return false;
    }
    const expira = Number(localStorage.getItem('expira'));
    const now = new Date().getTime();

    return expira > now ;
  }
}
