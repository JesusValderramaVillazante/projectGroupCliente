import { Component, Renderer2, OnInit, Input } from '@angular/core';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-foto-usuario',
  templateUrl: './foto-usuario.component.html',
  styleUrls: ['./foto-usuario.component.css']
})
export class FotoUsuarioComponent implements OnInit {
  @Input() datos: any;
  selectedFiles: File;
  mensajeEstado: Boolean = false;
  mensajeGuardado: Boolean = false;
  constructor(private us: UserService) { }

  ngOnInit() {
  }

  detectarFoto(event): void {
    this.selectedFiles = event.target.files[0];
    const datosUsuario = this.datos;
    const reader = new FileReader();

    reader.readAsDataURL(this.selectedFiles);
    reader.onloadend = function () {
      datosUsuario.fotoUrl = reader.result.toString();
    };
  }

  guardarFoto(): void {
    if (this.selectedFiles.size > 40000) {
      this.mensajeEstado = true;
      this.mensajeGuardado = false;
    } else {
      this.us.postFoto(this.selectedFiles).subscribe( data => {
        if (data.response) {
          this.mensajeGuardado = true;
          this.mensajeEstado = false;
        }
      }, error => {
        console.log(error.error);
      });
    }

    setTimeout(() => {
      this.mensajeEstado = false;
      this.mensajeGuardado = false;
    }, 2000);

  }
}
