import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class RegistroService {
  urlRegistro = '/usuario/nuevo';
  urlAuntenticar = '/auth/auntenticar';

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
