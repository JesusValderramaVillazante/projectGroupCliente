import { Component, OnInit } from '@angular/core';
import { StorageService } from '../../services/storage.service';
import { FormControl, FormGroup, FormBuilder , Validators} from '@angular/forms';
import { EventoService } from '../../services/evento.service';

@Component({
  selector: 'app-crear-evento',
  templateUrl: './crear-evento.component.html',
  styleUrls: ['./crear-evento.component.css']
})
export class CrearEventoComponent implements OnInit {
  registroEventoForm: FormGroup;
  registroEvento: any;
  datosEvento: Boolean = false;

  constructor(
    private fb: FormBuilder,
    private st: StorageService,
    private es: EventoService
    ) {}

  ngOnInit() {
    this.registroEventoForm = this.fb.group({
      titulo: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(40)]],
      descripcion: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(40)]],
      direccion: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(40)]],
      dia: ['', [Validators.required]],
      hora: ['', [Validators.required]],
      participantes: ['', [Validators.required]],
      precio: ['0.00', [Validators.required, Validators.pattern(/^[0-9]{1,3}[.][0-9]{1,2}$/)]]
    });
  }

  saveRegistroEvento() {
    const saveRegistro = {
      Titulo: this.registroEventoForm.get('titulo').value,
      Descripcion: this.registroEventoForm.get('descripcion').value,
      Direccion: this.registroEventoForm.get('direccion').value,
      Dia: this.registroEventoForm.get('dia').value,
      Hora: this.registroEventoForm.get('hora').value,
      Participantes: this.registroEventoForm.get('participantes').value,
      Precio: this.registroEventoForm.get('precio').value
    };
    return saveRegistro;
  }

  onSubmit() {
    this.registroEvento = this.saveRegistroEvento();
    this.es.postEvento(this.registroEvento).subscribe(result => {
      if (result.response) {
        this.datosEvento = true;
        this.registroEventoForm.reset();
      }
    }, error => {
      console.log(error.error);
    });

    setTimeout(() => {
      this.datosEvento = !this.datosEvento;
    }, 2000);
  }
}
