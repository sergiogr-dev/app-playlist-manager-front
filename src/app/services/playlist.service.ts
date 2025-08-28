import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { environment } from '../../environments/environment';
import { 
  PlaylistRequestDTO, 
  PlaylistResponseDTO, 
  StandardizeApiResponse 
} from '../models/api.models';

@Injectable({
  providedIn: 'root'
})
export class PlaylistService {
  private apiUrl = `${environment.apiUrl}/lists`;

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) {}

  private getAuthHeaders(): HttpHeaders {
    const token = this.authService.getToken();
    return new HttpHeaders().set('Authorization', `Bearer ${token}`);
  }

  getAllPlaylists(): Observable<StandardizeApiResponse<PlaylistResponseDTO[]>> {
    return this.http.get<StandardizeApiResponse<PlaylistResponseDTO[]>>(
      this.apiUrl, 
      { headers: this.getAuthHeaders() }
    );
  }

  getPlaylistByName(name: string): Observable<StandardizeApiResponse<PlaylistResponseDTO>> {
    return this.http.get<StandardizeApiResponse<PlaylistResponseDTO>>(
      `${this.apiUrl}/${encodeURIComponent(name)}`, 
      { headers: this.getAuthHeaders() }
    );
  }

  createPlaylist(playlist: PlaylistRequestDTO): Observable<StandardizeApiResponse<PlaylistResponseDTO>> {
    return this.http.post<StandardizeApiResponse<PlaylistResponseDTO>>(
      this.apiUrl, 
      playlist,
      { headers: this.getAuthHeaders() }
    );
  }

  deletePlaylistByName(name: string): Observable<any> {
    return this.http.delete(
      `${this.apiUrl}/${encodeURIComponent(name)}`, 
      { headers: this.getAuthHeaders() }
    );
  }
}
