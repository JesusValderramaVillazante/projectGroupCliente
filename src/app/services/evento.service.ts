import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { StorageService } from './storage.service';
import { Observable, of } from 'rxjs';
import { Resultado } from '../models/Resultado';

@Injectable({
  providedIn: 'root'
})
export class EventoService {
  private urlCrearEvento = 'http://u363930042.hostingerapp.com/evento/crear';
  private urlObtenerEvento = 'http://u363930042.hostingerapp.com/evento/obtener/';
  private urlObtenerEventoJugarId = 'http://u363930042.hostingerapp.com/evento/jugar/';
  private urlApuntarseEvento = 'http://u363930042.hostingerapp.com/evento/participar';
  private urlParticipanteEvento = 'http://u363930042.hostingerapp.com/evento/participantes/';
  private urlBorrarseEvento = 'http://u363930042.hostingerapp.com/evento/borrarme/';
  private urlBorrarEvento = 'http://u363930042.hostingerapp.com/evento/borrar/';

  constructor(private http: HttpClient, private st: StorageService) {
  }

  postEvento(evento$): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({'APP-TOKEN': this.st.getAuthToken()})
    };
    return this.http.post(this.urlCrearEvento, evento$, httpOptions);
  }

  getEventos (dia$ = 0): Observable<Resultado> {
    const httpOptions = {
      headers: new HttpHeaders({'APP-TOKEN': this.st.getAuthToken()})
    };
    return this.http.get<Resultado>(this.urlObtenerEvento + dia$, httpOptions);
  }

  getEventoJugar (id$): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({'APP-TOKEN': this.st.getAuthToken()})
    };
    return this.http.get<Resultado>(this.urlObtenerEventoJugarId + id$, httpOptions);
  }

  postEventoParticipar (evento$): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({'APP-TOKEN': this.st.getAuthToken()})
    };
    return this.http.post<Resultado>(this.urlApuntarseEvento, evento$, httpOptions);
  }

  getEventoParticipantes (id$): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({'APP-TOKEN': this.st.getAuthToken()})
    };
    return this.http.get<Resultado>(this.urlParticipanteEvento + id$, httpOptions);
  }

  deleteEventoBorrarse (idEvento$): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({'APP-TOKEN': this.st.getAuthToken()})
    };
    return this.http.delete<Resultado>(`${this.urlBorrarseEvento}${idEvento$}`, httpOptions);
  }

  deleteEventoBorrar (idEvento$): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({'APP-TOKEN': this.st.getAuthToken()})
    };
    return this.http.delete<Resultado>(`${this.urlBorrarEvento}${idEvento$}`, httpOptions);
  }
}
