import { Component, OnInit, Input } from '@angular/core';
import { StorageService } from '../services/storage.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  @Input() logout: Boolean = false;

  constructor(
    private router: Router,
    private st: StorageService
  ) { }

  ngOnInit() {
  }

  logoutUser() {
    this.st.delToken();
    this.logout = false;
  }
}
