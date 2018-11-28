import { Component, OnInit, Input } from '@angular/core';
import { FormControl, FormGroup, FormBuilder , Validators} from '@angular/forms';
import { Observable, of } from 'rxjs';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-datos-usuario',
  templateUrl: './datos-usuario.component.html',
  styleUrls: ['./datos-usuario.component.css']
})
export class DatosUsuarioComponent implements OnInit {
  @Input() datos: any;
  usuarioForm: FormGroup;
  registro: any;
  datosActualizado: Boolean = false;

  constructor(
    private fb: FormBuilder,
    private us: UserService
    ) {}

  ngOnInit() {
    this.usuarioForm = this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(30)] ],
      email: [''],
      fechaNacimiento: [''],
      numeroMovil: [''],
      genero: ['']
    });
  }

  saveRegistro() {
    const saveRegistro = {
      nombre: this.usuarioForm.get('nombre').value,
      email: this.usuarioForm.get('email').value,
      fechaNacimiento: this.usuarioForm.get('fechaNacimiento').value,
      numeroMovil: this.usuarioForm.get('numeroMovil').value,
      genero: this.usuarioForm.get('genero').value
    };
    return saveRegistro;
  }

  onSubmit() {
    this.registro = this.saveRegistro();
    this.us.putUser(this.registro).subscribe( resp => {
      if (resp.response) {
        this.datosActualizado = true;
      }
    }, error => {
      console.log(error.error);
    });

    setTimeout(() => {
      this.datosActualizado = !this.datosActualizado;
    }, 2000);
  }
}
