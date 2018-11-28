import { Component, OnInit, NgZone } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { RegistroService } from '../../services/registro.service';
import { Resultado } from '../../models/Resultado';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { StorageService } from '../../services/storage.service';

@Component({
  selector: 'app-one-block',
  templateUrl: './oneBlock.component.html',
  styleUrls: ['./oneBlock.component.css']
})

export class OneBlockComponent implements OnInit {
  loginForm: FormGroup;
  login: any;
  loginFormAlert: Boolean = false;

  constructor(
    private au: AuthService,
    private router: Router,
    private registroService: RegistroService,
    private fb: FormBuilder,
    private st: StorageService,
    private nz: NgZone
  ) {
  }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.pattern(/^[\w]+[@][\w]+[.][\w]+$/), Validators.maxLength(30)]],
      password: ['', [Validators.required]]
    });
  }


  onSubmit() {
    this.login = this.saveLogin();

    this.registroService.postAuntenticar(this.login.email, this.login.password).subscribe((acceso: Resultado) => {
      if (acceso.response === true) {
        this.st.addToken(acceso.result);
        this.router.navigate(['dashboard']);
      } else {
        this.loginFormAlert = true;
      }
    });

  }

  saveLogin() {
    const saveLogin = {
      email: this.loginForm.get('email').value,
      password: this.loginForm.get('password').value
    };
    return saveLogin;
  }

  obtenerToken(email, password): void {
    this.registroService.postAuntenticar(email, password).subscribe((acceso: Resultado) => {
      if (acceso.response) {
        this.st.addToken(acceso.result);
        this.nz.run(() => {
          this.router.navigate(['dashboard']);
        });
      }
    });
  }

  loginGoogle() {
    this.au.signInWithGoogle().then(result => {
      const saveRegistro = {
        nombre: result.user.providerData[0].displayName,
        email: result.user.providerData[0].email,
        password: result.user.providerData[0].uid,
        fotoUrl: result.user.providerData[0].photoURL
      };

      this.registroService.postAuntenticar(saveRegistro.email, saveRegistro.password).subscribe((acceso: Resultado) => {
        if (acceso.response === false) {
          this.registroService.postRegistro(saveRegistro).subscribe((data: Resultado) => {
            if (data.response) {
              this.obtenerToken(saveRegistro.email, saveRegistro.password);
            }
          }, error => {
            console.log(error);
          });
        } else {
          this.st.addToken(acceso.result);
          this.nz.run(() => {
            this.router.navigate(['dashboard']);
          });
        }
      });

    });
  }
}
