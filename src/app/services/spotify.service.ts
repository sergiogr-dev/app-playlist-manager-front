import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { StandardizeApiResponse } from '../models/api.models';
import { environment } from '../../environments/environment';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class SpotifyService {
  private apiUrl = `${environment.apiUrl}/api/v1/spotify`;

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) {}

  private getAuthHeaders(): HttpHeaders {
    const token = this.authService.getToken();
    return new HttpHeaders().set('Authorization', `Bearer ${token}`);
  }

  getMarkets(): Observable<StandardizeApiResponse<string[]>> {
    return this.http.get<StandardizeApiResponse<string[]>>(
      this.apiUrl,
      { headers: this.getAuthHeaders() }
    );
  }
}