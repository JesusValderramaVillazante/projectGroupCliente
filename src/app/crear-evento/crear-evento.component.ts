import { Component, OnInit } from '@angular/core';
import { StorageService } from '../services/storage.service';

@Component({
  selector: 'app-crear-evento',
  templateUrl: './crear-evento.component.html',
  styleUrls: ['./crear-evento.component.css']
})
export class CrearEventoComponent implements OnInit {

  logout: Boolean = false;

  constructor(private st: StorageService) { }

  ngOnInit() {
    this.logout = this.st.getToken();
  }

}
