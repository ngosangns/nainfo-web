import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = environment.apiUrl; // Define API base URL in environment.ts

  constructor(
    private http: HttpClient,
    private storageService: StorageService
  ) {}

  login(credentials: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/auth/login`, credentials);
  }

  register(credentials: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/auth/register`, credentials);
  }

  private loggedIn = new BehaviorSubject<boolean>(this.checkTokenValidity()); // Observable to track login status
  isLoggedIn$ = this.loggedIn.asObservable(); // Make it easier to subscribe to changes

  isLoggedIn(): boolean {
    return this.loggedIn.getValue();
  }

  private checkTokenValidity(): boolean {
    const token = this.storageService.getToken();
    if (token) {
      // Add logic to check token expiration (if applicable)
      // Example (assuming JWT with 'exp' claim):
      // const decodedToken = JSON.parse(atob(token.split('.')[1]));
      // return (decodedToken.exp * 1000) > Date.now();

      return true; // Token exists and is valid (for this example)
    }
    return false;
  }

  logout() {
    this.storageService.removeToken();
    this.loggedIn.next(false); // Update the login status
  }

  // set token
  setToken(token: string): void {
    this.storageService.setToken(token);
    this.loggedIn.next(true); // Update the login status
  }
}
