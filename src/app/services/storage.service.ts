import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() { }

  getToken(): boolean {
    if (localStorage.getItem('APP-TOKEN') !== null) {
      return true;
    } else {
      return false;
    }
  }

  getAuthToken(): string {
    return localStorage.getItem('APP-TOKEN');
  }

  delToken(): void {
    localStorage.removeItem('APP-TOKEN');
  }

  addToken(token): void {
    localStorage.setItem('APP-TOKEN', token);
  }

  getAdminToken(): boolean {
    const tokenString = localStorage.getItem('APP-TOKEN');
    if (tokenString) {
      const base64Url = tokenString.split('.')[1];
      const base64 = base64Url.replace('-', '+').replace('_', '/');
      const result = JSON.parse(window.atob(base64));
      return result.data.EsAdmin;
    }
    return false;
  }
}
