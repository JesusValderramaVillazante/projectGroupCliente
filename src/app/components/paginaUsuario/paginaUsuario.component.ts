import { Component, OnInit } from '@angular/core';
import { StorageService } from '../../services/storage.service';
import { UserService } from '../../services/user.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-pagina-usuario',
  templateUrl: './paginaUsuario.component.html',
  styleUrls: ['./paginaUsuario.component.css']
})
export class PaginaUsuarioComponent implements OnInit {
  datoUsuario = {};

  constructor(
    private st: StorageService,
    private us: UserService,
    private ro: Router) { }

  ngOnInit() {
    this.us.getUser().subscribe(data => {
      this.datoUsuario = data.result;
    }, err => {
      this.st.delToken();
      this.ro.navigate(['/']);
    });
  }
}
