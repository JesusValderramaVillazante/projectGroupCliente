import { Component, OnInit } from '@angular/core';
import { EventoService } from '../../../services/evento.service';
import { UserService } from '../../../services/user.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Resultado } from '../../../models/Resultado';
import { StorageService } from '../../../services/storage.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-eventos-block',
  templateUrl: './eventos-block.component.html',
  styleUrls: ['./eventos-block.component.css']
})
export class EventosBlockComponent implements OnInit {
  eventos: Resultado = null;
  diaSeleccionador = 0;
  fechaEvento = new Date();

  constructor(
    private es: EventoService,
    private st: StorageService,
    private ro: Router,
    private us: UserService) { }

  ngOnInit() {
    this.es.getEventos().subscribe((data: Resultado) => {
      this.eventos = data.result;
    }, error => {
      console.warn(error);
    });
  }

  filtroDia($event) {
    this.es.getEventos($event).subscribe((data: Resultado) => {
      this.diaSeleccionador = $event;
      this.fechaEvento = new Date(data.message);
      this.eventos = data.result;
    }, error => {
      console.warn(error);
      this.st.delToken();
      this.ro.navigate(['/']);
    });
  }
}
