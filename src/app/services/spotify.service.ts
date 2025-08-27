import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { StandardizeApiResponse } from '../models/api.models';

@Injectable({
  providedIn: 'root'
})
export class SpotifyService {
  private apiUrl = 'http://localhost:8080/api/v1/spotify';

  constructor(private http: HttpClient) {}

  getMarkets(): Observable<StandardizeApiResponse<string[]>> {
    return this.http.get<StandardizeApiResponse<string[]>>(this.apiUrl);
  }
}
