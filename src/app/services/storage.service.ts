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

  delToken(): void {
    localStorage.removeItem('APP-TOKEN');
  }

  addToken(token): void {
    localStorage.setItem('APP-TOKEN', token);
  }
}
