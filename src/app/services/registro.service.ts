import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RegistroService {
  urlRegistro = `${environment.baseUrl}usuario/nuevo`;
  urlAuntenticar = `${environment.baseUrl}auth/auntenticar`;

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
