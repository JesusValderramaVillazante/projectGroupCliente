import { Component, OnInit, Input } from '@angular/core';
import { StorageService } from '../../services/storage.service';
import { Router, ActivatedRoute } from '@angular/router';
import {} from '../../services/storage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  constructor(
    private router: Router,
    private ar: ActivatedRoute,
    private st: StorageService
  ) {
  }

  ngOnInit() {
  }

  logoutUser() {
    this.st.delToken();
  }

  isAdmin(): Boolean {
    return this.st.getAdminToken();
  }

  logout(): Boolean {
    return this.st.getToken();
  }
}
