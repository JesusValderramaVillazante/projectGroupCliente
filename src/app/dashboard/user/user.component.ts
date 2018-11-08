import { Component, OnInit } from '@angular/core';
import { StorageService } from '../../services/storage.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  logout: Boolean = false;
  constructor(private st: StorageService) { }

  ngOnInit() {
    this.logout = this.st.getToken();
  }
}
