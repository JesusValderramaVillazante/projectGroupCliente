import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { StorageService } from './storage.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  urlGetData = '/usuario/datos';
  urlPostFoto = '/usuario/fotoPerfil';
  urlPutUser = '/usuario/actualizar';

  constructor(private http: HttpClient, private st: StorageService) { }

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
}
