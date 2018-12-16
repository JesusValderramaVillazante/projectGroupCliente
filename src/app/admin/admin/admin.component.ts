import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../services/admin.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { StorageService } from '../../services/storage.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  eventos: Observable<any>;
  datosBuscar: string;
  constructor(private as: AdminService, private st: StorageService, private ro: Router) { }

  ngOnInit() {
    this.eventos = this.as.getEventos().pipe(
      map(data => {
        return data;
      }, erros => {
        console.warn(erros);
        this.st.delToken();
        this.ro.navigate(['/']);
      })
    );
  }

  onModelChange() {
    this.busqueda(this.datosBuscar);
  }

  busqueda(valor: string) {
    this.eventos = this.as.getEventos().pipe(
      map(
        result => result.filter(r => {
          return r.nombre.includes(valor);
        }), erros => {
          console.warn(erros);
          this.st.delToken();
          this.ro.navigate(['/']);
        }
      )
    );
  }
}
