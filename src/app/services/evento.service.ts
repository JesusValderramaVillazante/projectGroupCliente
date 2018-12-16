import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { StorageService } from './storage.service';
import { Observable, of } from 'rxjs';
import { Resultado } from '../models/Resultado';

@Injectable({
  providedIn: 'root'
})
export class EventoService {
  private urlCrearEvento = 'https://projectofinalgroup.000webhostapp.com/evento/crear';
  private urlObtenerEvento = 'https://projectofinalgroup.000webhostapp.com/evento/obtener/';
  private urlObtenerEventoJugarId = 'https://projectofinalgroup.000webhostapp.com/evento/jugar/';
  private urlApuntarseEvento = 'https://projectofinalgroup.000webhostapp.com/evento/participar';
  private urlParticipanteEvento = 'https://projectofinalgroup.000webhostapp.com/evento/participantes/';
  private urlBorrarseEvento = 'https://projectofinalgroup.000webhostapp.com/evento/borrarme/';
  private urlBorrarEvento = 'https://projectofinalgroup.000webhostapp.com/evento/borrar/';

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
