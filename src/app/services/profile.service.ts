import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  private apiUrl = environment.apiUrl; // Define API base URL in environment.ts

  constructor(private http: HttpClient, private storage: StorageService) {}

  getProfile(): Observable<any> {
    const token = this.storage.getToken(); // Get token from local storage (see below)
    const headers = { Authorization: `Bearer ${token}` };
    return this.http.get(`${this.apiUrl}/profile/me`, { headers });
  }

  updateProfile(profileData: any): Observable<any> {
    const token = this.storage.getToken();
    const headers = { Authorization: `Bearer ${token}` };
    return this.http.put(`${this.apiUrl}/profile/me`, profileData, { headers });
  }
}
