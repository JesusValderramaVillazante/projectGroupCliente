import { Component, OnInit, Input } from '@angular/core';
import { FormControl, FormGroup, FormBuilder , Validators} from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UserService } from '../../../services/user.service';
import { StorageService } from '../../../services/storage.service';
import { Router, ActivatedRoute } from '@angular/router';

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
    private us: UserService,
    private modalService: NgbModal,
    private st: StorageService,
    private ro: Router
    ) {}

  ngOnInit() {
    this.usuarioForm = this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(30)] ],
      email: [''],
      fechaNacimiento: [''],
      numeroMovil: ['', [Validators.required, Validators.pattern(/^[6-9][0-9]{8}$/)]],
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

  open(content) {
    this.modalService.open(content);
  }

  onClickEliminar() {
    this.us.deleteUser().subscribe(resp => {
      if (resp.response) {
        this.st.delToken();
        this.ro.navigate(['/']);
        this.modalService.dismissAll();
      }
    });
  }
}
