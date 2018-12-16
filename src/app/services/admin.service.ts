import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { StorageService } from './storage.service';
import { Observable, of } from 'rxjs';
import { Resultado } from '../models/Resultado';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  private urlGetEventos = 'https://projectofinalgroup.000webhostapp.com/admin/usuarios';

  constructor(private http: HttpClient, private st: StorageService) {
  }

  getEventos (): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({'APP-TOKEN': this.st.getAuthToken()})
    };
    return this.http.get(this.urlGetEventos, httpOptions).pipe(
      map( (data: Resultado) => {
        return data.result;
      } )
    );
  }
}
