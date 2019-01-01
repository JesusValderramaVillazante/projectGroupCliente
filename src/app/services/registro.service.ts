import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class RegistroService {
  urlRegistro = 'http://u363930042.hostingerapp.com/usuario/nuevo';
  urlAuntenticar = 'http://u363930042.hostingerapp.com/auth/auntenticar';

  constructor(private http: HttpClient) {}

  postRegistro(registro: any) {
    return this.http.post(this.urlRegistro, registro);
  }

  postAuntenticar(e: string, p: string) {
    const auntenticar = {
      email: e,
      password: p
    };

    return this.http.post(this.urlAuntenticar, auntenticar);
  }
}
