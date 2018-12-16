import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormControl, FormGroup, FormBuilder , Validators} from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Resultado } from '../../models/Resultado';
import { EventoService } from '../../services/evento.service';
import { UserService } from '../../services/user.service';
import { StorageService } from '../../services/storage.service';
import { AngularFireDatabase } from '@angular/fire/database';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-evento',
  templateUrl: './evento.component.html',
  styleUrls: ['./evento.component.css']
})
export class EventoComponent implements OnInit {
  event$: any = [];
  chatEventoForm: FormGroup;
  mensajeChat: any = {};
  numerJuegadores = [];
  mensajesChat: Observable<any[]>;
  usuarioApuntado: Boolean = true;
  usuarioOrganiza: Boolean = true;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private es: EventoService,
    private st: StorageService,
    private modalService: NgbModal,
    private fb: FormBuilder,
    private us: UserService,
    private db: AngularFireDatabase
    ) {
    }

  ngOnInit() {
    const id = +this.route.snapshot.paramMap.get('id');
    // chat
    this.mensajesChat = this.db.list(id.toString()).valueChanges();

    this.es.getEventoJugar(id).subscribe((res: Resultado) => {
      this.event$ = res.result[0];
      this.numerJuegadores = new Array(parseInt(this.event$.Participantes, 10)).fill({});
      this.rellenarParticipante(id);
    }, err => {
      this.st.delToken();
      this.router.navigate(['/']);
    });

    this.chatEventoForm = this.fb.group({
      mensaje: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(40)]],
    });

    this.us.getParticipa(id).subscribe(resp => {
      if (resp.response) {
        this.usuarioApuntado = false;
      }
    });

    this.us.getOrganiza(id).subscribe(resp => {
      if (resp.response) {
        this.usuarioOrganiza = false;
      }
    });

  }

  open(content) {
    this.modalService.open(content);
  }

  onClickApuntarse(idEvento$) {
    const evento = {
      'IdEvento': idEvento$
    };

    this.es.postEventoParticipar(evento).subscribe(d => {
      if ( d.response ) {
        this.usuarioApuntado = false;
        this.rellenarParticipante(idEvento$);

        this.modalService.dismissAll();
      } else {
        this.modalService.dismissAll();
      }
    }, err => {
      console.log(err);
    });

  }

  rellenarParticipante($id): void {
    this.es.getEventoParticipantes($id).subscribe((r: Resultado) => {
      for (let i = 0; i < r.result.length; i++) {
        this.numerJuegadores[i] = r.result[i];
      }
    });
  }

  saveChat() {
    const saveMensaje = {
      mensaje: this.chatEventoForm.get('mensaje').value.trim(),
      idUsuario: '',
      nombreUsuario: '',
      fotoUrlUsuario: '',
      fecha: ''
    };
    return saveMensaje;
  }

  onSubmit() {
    this.mensajeChat = this.saveChat();
    const fecha = new Date();
    this.us.getUser().subscribe(data => {
      this.mensajeChat.idUsuario = data.result.id;
      this.mensajeChat.nombreUsuario = data.result.nombre;
      this.mensajeChat.fotoUrlUsuario = data.result.fotoUrl;
      this.mensajeChat.fecha = `${fecha.toLocaleDateString()} ${fecha.toLocaleTimeString()}`;
      this.chatSave(this.mensajeChat);
    });
  }

  chatSave(datosMensaje) {
    const listRef = this.db.list(this.event$.Id);
    listRef.push(datosMensaje);
    this.chatEventoForm.reset();
  }

  onClickborrarme(idEvento) {
    this.es.deleteEventoBorrarse(idEvento).subscribe(result => {
      if (result.response) {
        this.usuarioApuntado = true;
        this.es.getEventoJugar(idEvento).subscribe((res: Resultado) => {
          this.event$ = res.result[0];
          this.numerJuegadores = new Array(parseInt(this.event$.Participantes, 10)).fill({});
          this.rellenarParticipante(idEvento);
        });
      }
    });
  }

  onClickborrarEvento(idEvento) {
    this.es.deleteEventoBorrar(idEvento).subscribe(result => {
      if (result.response) {
        this.router.navigate(['eventos']);
      }
    });
  }

}
