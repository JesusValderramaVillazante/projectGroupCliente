import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder , Validators} from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { RegistroService } from '../../services/registro.service';
import { Resultado } from '../../models/Resultado';
import { StorageService } from '../../services/storage.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {
  registroForm: FormGroup;
  registro: any;
  registroFormAlert: Boolean = false;
  borrar = false;

  constructor(
    private fb: FormBuilder,
    private registroService: RegistroService,
    private router: Router,
    private ar: ActivatedRoute,
    private st: StorageService) {}

  ngOnInit() {
    this.registroForm = this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(30)]],
      email: ['', [Validators.required, Validators.pattern(/^[\w]+[@][\w]+[.][\w]+$/), Validators.maxLength(30)]],
      password: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(10)]]
    });
  }

  saveRegistro() {
    const saveRegistro = {
      nombre: this.registroForm.get('nombre').value,
      email: this.registroForm.get('email').value,
      password: this.registroForm.get('password').value
    };
    return saveRegistro;
  }

  onSubmit() {
    this.registro = this.saveRegistro();

    this.registroService.postRegistro(this.registro).subscribe((data: Resultado) => {
      if (data.response) {
        this.registroService.postAuntenticar(this.registro.email, this.registro.password).subscribe( (acceso: Resultado) => {
          this.st.addToken(acceso.result);
          this.registroForm.reset();
          this.router.navigate(['eventos']);
        });
      }
    }, error => {
      if ( error.error.email.includes('ya existe')) {
        this.registroFormAlert = true;
      } else {
        console.log(error.error);
      }
    });

  }
}
