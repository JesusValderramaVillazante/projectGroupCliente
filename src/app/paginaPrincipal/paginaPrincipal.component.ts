import { Component, OnInit } from '@angular/core';
import { StorageService } from '../services/storage.service';

@Component({
  selector: 'app-pagina-principal',
  templateUrl: './paginaPrincipal.component.html',
  styleUrls: ['./paginaPrincipal.component.css']
})
export class PaginaPrincipalComponent implements OnInit {
  logout: Boolean = false;

  constructor(private st: StorageService) { }

  ngOnInit() {
    this.logout = this.st.getToken();
  }
}
