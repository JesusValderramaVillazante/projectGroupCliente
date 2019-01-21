import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { StorageService } from './storage.service';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  urlGetData = `${environment.baseUrl}usuario/datos`;
  urlPostFoto = `${environment.baseUrl}usuario/fotoPerfil`;
  urlPutUser = `${environment.baseUrl}usuario/actualizar`;
  urlGetParticipa = `${environment.baseUrl}usuario/participa/`;
  urlGetOrganiza = `${environment.baseUrl}usuario/organiza/`;
  urlDeleteUser = `${environment.baseUrl}usuario/eliminar`;

  constructor(private http: HttpClient, private st: StorageService) {
  }

  httpOptions(): object {
    return { headers: new HttpHeaders({ 'APP-TOKEN': this.st.getAuthToken() }) };
  }

  getUser(): Observable<any> {
    return this.http.get(this.urlGetData, this.httpOptions());
  }

  postFoto(foto: File): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('fotoUrl', foto, foto.name);
    return this.http.post(this.urlPostFoto, formData, this.httpOptions());
  }

  putUser(datos): Observable<any> {
    return this.http.put(this.urlPutUser, datos, this.httpOptions());
  }

  getParticipa(idEvento): Observable<any> {
    return this.http.get(`${this.urlGetParticipa}${idEvento}`, this.httpOptions());
  }

  getOrganiza(idEvento): Observable<any> {
    return this.http.get(`${this.urlGetOrganiza}${idEvento}`, this.httpOptions());
  }

  deleteUser(): Observable<any> {
    return this.http.delete(this.urlDeleteUser, this.httpOptions());
  }
}
