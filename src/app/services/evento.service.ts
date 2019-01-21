import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { StorageService } from './storage.service';
import { Observable, of } from 'rxjs';
import { Resultado } from '../models/Resultado';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EventoService {
  private urlCrearEvento = `${environment.baseUrl}evento/crear`;
  private urlObtenerEvento = `${environment.baseUrl}evento/obtener/`;
  private urlObtenerEventoJugarId = `${environment.baseUrl}evento/jugar/`;
  private urlApuntarseEvento = `${environment.baseUrl}evento/participar`;
  private urlParticipanteEvento = `${environment.baseUrl}evento/participantes/`;
  private urlBorrarseEvento = `${environment.baseUrl}evento/borrarme/`;
  private urlBorrarEvento = `${environment.baseUrl}evento/borrar/`;

  constructor(private http: HttpClient, private st: StorageService) {
  }

  httpOptions(): object {
    return { headers: new HttpHeaders({ 'APP-TOKEN': this.st.getAuthToken() }) };
  }

  postEvento(evento$): Observable<any> {
    return this.http.post(this.urlCrearEvento, evento$, this.httpOptions());
  }

  getEventos(dia$ = 0): Observable<Resultado> {
    return this.http.get<Resultado>(this.urlObtenerEvento + dia$, this.httpOptions());
  }

  getEventoJugar(id$): Observable<any> {
    return this.http.get<Resultado>(this.urlObtenerEventoJugarId + id$, this.httpOptions());
  }

  postEventoParticipar(evento$): Observable<any> {
    return this.http.post<Resultado>(this.urlApuntarseEvento, evento$, this.httpOptions());
  }

  getEventoParticipantes(id$): Observable<any> {
    return this.http.get<Resultado>(this.urlParticipanteEvento + id$, this.httpOptions());
  }

  deleteEventoBorrarse(idEvento$): Observable<any> {
    return this.http.delete<Resultado>(`${this.urlBorrarseEvento}${idEvento$}`, this.httpOptions());
  }

  deleteEventoBorrar(idEvento$): Observable<any> {
    return this.http.delete<Resultado>(`${this.urlBorrarEvento}${idEvento$}`, this.httpOptions());
  }
}
