import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { StorageService } from './storage.service';
import { Observable, of } from 'rxjs';
import { Resultado } from '../models/Resultado';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  private urlGetEventos = `${environment.baseUrl}admin/usuarios`;

  constructor(private http: HttpClient, private st: StorageService) {
  }

  httpOptions(): object {
    return { headers: new HttpHeaders({ 'APP-TOKEN': this.st.getAuthToken() }) };
  }

  getEventos (): Observable<any> {
    return this.http.get(this.urlGetEventos, this.httpOptions()).pipe(
      map( (data: Resultado) => {
        return data.result;
      } )
    );
  }
}
