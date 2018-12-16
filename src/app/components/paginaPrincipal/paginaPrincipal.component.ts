import { Component, OnInit } from '@angular/core';
import { StorageService } from '../../services/storage.service';
import { UserService } from '../../services/user.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-pagina-principal',
  templateUrl: './paginaPrincipal.component.html',
  styleUrls: ['./paginaPrincipal.component.css']
})
export class PaginaPrincipalComponent implements OnInit {
  constructor(
    private st: StorageService,
    private us: UserService,
    private ro: Router) { }

  ngOnInit() {
    this.us.getUser().subscribe(data => {
      console.log('Bienvenido Pagina principal');
    }, err => {
      this.st.delToken();
      this.ro.navigate(['/']);
    });
  }
}
