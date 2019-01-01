import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { StorageService } from './storage.service';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  urlGetData = 'http://u363930042.hostingerapp.com/usuario/datos';
  urlPostFoto = 'http://u363930042.hostingerapp.com/usuario/fotoPerfil';
  urlPutUser = 'http://u363930042.hostingerapp.com/usuario/actualizar';
  urlGetParticipa = 'http://u363930042.hostingerapp.com/usuario/participa/';
  urlGetOrganiza = 'http://u363930042.hostingerapp.com/usuario/organiza/';
  urlDeleteUser = 'http://u363930042.hostingerapp.com/usuario/eliminar';

  constructor(private http: HttpClient, private st: StorageService) {
  }

  getUser(): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({'APP-TOKEN': this.st.getAuthToken()})
    };
    return this.http.get(this.urlGetData, httpOptions);
  }

  postFoto(foto: File): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({'APP-TOKEN': this.st.getAuthToken()})
    };

    const formData: FormData = new FormData();
    formData.append('fotoUrl', foto, foto.name);
    return this.http.post(this.urlPostFoto, formData, httpOptions);
  }

  putUser(datos): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({'APP-TOKEN': this.st.getAuthToken()})
    };
    return this.http.put(this.urlPutUser, datos, httpOptions);
  }

  getParticipa(idEvento): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({'APP-TOKEN': this.st.getAuthToken()})
    };
    return this.http.get(`${this.urlGetParticipa}${idEvento}`, httpOptions);
  }

  getOrganiza(idEvento): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({'APP-TOKEN': this.st.getAuthToken()})
    };
    return this.http.get(`${this.urlGetOrganiza}${idEvento}`, httpOptions);
  }

  deleteUser(): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({'APP-TOKEN': this.st.getAuthToken()})
    };
    return this.http.delete(this.urlDeleteUser, httpOptions);
  }
}
