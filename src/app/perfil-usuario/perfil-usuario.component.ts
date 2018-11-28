import { Component, OnInit } from '@angular/core';
import { StorageService } from '../services/storage.service';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-perfil-usuario',
  templateUrl: './perfil-usuario.component.html',
  styleUrls: ['./perfil-usuario.component.css']
})
export class PerfilUsuarioComponent implements OnInit {
  datoUsuario = {};
  logout: Boolean = false;

  constructor(private st: StorageService, private ro: Router, private us: UserService) { }

  ngOnInit() {
    this.logout = this.st.getToken();
    this.us.getUser().subscribe(data => {
      this.datoUsuario = data.result;
    }, err => {
      this.st.delToken();
      this.ro.navigate(['/']);
    });
  }

}
