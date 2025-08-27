import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { PlaylistService } from '../services/playlist.service';
import { PlaylistResponseDTO, PlaylistRequestDTO, SongRequestDTO } from '../models/api.models';

@Component({
  selector: 'app-playlists',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <div class="playlists-container">
      <!-- Header -->
      <header class="header">
        <h1>Gestión de Playlists</h1>
        <div class="user-info">
          <span>Bienvenido, {{ currentUser?.username }}</span>
          <button (click)="logout()" class="btn-logout">Cerrar Sesión</button>
        </div>
      </header>

      <!-- Create Playlist Form -->
      <div class="create-section">
        <h2>Crear Nueva Playlist</h2>
        <form [formGroup]="playlistForm" (ngSubmit)="createPlaylist()">
          <div class="form-row">
            <div class="form-group">
              <label for="name">Nombre:</label>
              <input 
                type="text" 
                id="name" 
                formControlName="name" 
                class="form-control"
                placeholder="Nombre de la playlist"
              >
            </div>
            <div class="form-group">
              <label for="description">Descripción (opcional):</label>
              <input 
                type="text" 
                id="description" 
                formControlName="description" 
                class="form-control"
                placeholder="Descripción de la playlist"
              >
            </div>
          </div>

          <!-- Songs -->
          <div class="songs-section">
            <h3>Canciones</h3>
            <div formArrayName="songs">
              <div *ngFor="let song of songs.controls; let i = index" [formGroupName]="i" class="song-form">
                <div class="song-row">
                  <div class="form-group">
                    <input 
                      type="text" 
                      formControlName="title" 
                      class="form-control"
                      placeholder="Título de la canción"
                    >
                  </div>
                  <div class="form-group">
                    <input 
                      type="text" 
                      formControlName="artist" 
                      class="form-control"
                      placeholder="Artista"
                    >
                  </div>
                  <div class="form-group">
                    <input 
                      type="text" 
                      formControlName="album" 
                      class="form-control"
                      placeholder="Álbum (opcional)"
                    >
                  </div>
                  <div class="form-group">
                    <input 
                      type="number" 
                      formControlName="year" 
                      class="form-control"
                      placeholder="Año"
                      min="1900"
                      max="2030"
                    >
                  </div>
                  <div class="form-group">
                    <input 
                      type="text" 
                      formControlName="genre" 
                      class="form-control"
                      placeholder="Género (opcional)"
                    >
                  </div>
                  <button type="button" (click)="removeSong(i)" class="btn-remove">×</button>
                </div>
              </div>
            </div>
            <button type="button" (click)="addSong()" class="btn-add-song">+ Agregar Canción</button>
          </div>

          <div class="form-actions">
            <button type="submit" [disabled]="playlistForm.invalid || createLoading" class="btn-primary">
              {{ createLoading ? 'Creando...' : 'Crear Playlist' }}
            </button>
          </div>

          <div class="error-message" *ngIf="createErrorMessage">
            {{ createErrorMessage }}
          </div>
        </form>
      </div>

      <!-- Playlists List -->
      <div class="playlists-list">
        <h2>Mis Playlists</h2>
        <div *ngIf="loadingPlaylists" class="loading">Cargando playlists...</div>
        <div *ngIf="playlistsErrorMessage" class="error-message">{{ playlistsErrorMessage }}</div>
        
        <div *ngIf="!loadingPlaylists && playlists.length === 0" class="no-playlists">
          No tienes playlists creadas aún.
        </div>

        <div class="playlist-cards">
          <div *ngFor="let playlist of playlists" class="playlist-card">
            <div class="playlist-header">
              <h3>{{ playlist.name }}</h3>
              <button (click)="deletePlaylist(playlist.name)" class="btn-delete">Eliminar</button>
            </div>
            <p *ngIf="playlist.description" class="playlist-description">{{ playlist.description }}</p>
            <div class="songs-count">{{ playlist.songs.length }} canción(es)</div>
            
            <div class="songs-list" *ngIf="playlist.songs.length > 0">
              <div *ngFor="let song of playlist.songs" class="song-item">
                <strong>{{ song.title }}</strong> - {{ song.artist }}
                <span *ngIf="song.album"> ({{ song.album }})</span>
                <span *ngIf="song.year"> - {{ song.year }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .playlists-container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 1rem;
    }

    .header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      background: #007bff;
      color: white;
      padding: 1rem;
      border-radius: 8px;
      margin-bottom: 2rem;
    }

    .user-info {
      display: flex;
      align-items: center;
      gap: 1rem;
    }

    .btn-logout {
      background: rgba(255, 255, 255, 0.2);
      color: white;
      border: 1px solid rgba(255, 255, 255, 0.3);
      padding: 0.5rem 1rem;
      border-radius: 4px;
      cursor: pointer;
    }

    .btn-logout:hover {
      background: rgba(255, 255, 255, 0.3);
    }

    .create-section {
      background: white;
      padding: 2rem;
      border-radius: 8px;
      box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
      margin-bottom: 2rem;
    }

    .form-row {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 1rem;
      margin-bottom: 1rem;
    }

    .form-group {
      margin-bottom: 1rem;
    }

    label {
      display: block;
      margin-bottom: 0.5rem;
      font-weight: 500;
      color: #555;
    }

    .form-control {
      width: 100%;
      padding: 0.75rem;
      border: 1px solid #ddd;
      border-radius: 4px;
      font-size: 1rem;
      box-sizing: border-box;
    }

    .form-control:focus {
      outline: none;
      border-color: #007bff;
      box-shadow: 0 0 0 2px rgba(0, 123, 255, 0.25);
    }

    .songs-section {
      border-top: 1px solid #eee;
      padding-top: 1rem;
      margin-top: 1rem;
    }

    .song-form {
      border: 1px solid #eee;
      border-radius: 4px;
      padding: 1rem;
      margin-bottom: 1rem;
      background: #f8f9fa;
    }

    .song-row {
      display: grid;
      grid-template-columns: 2fr 2fr 2fr 1fr 1fr auto;
      gap: 0.5rem;
      align-items: end;
    }

    .btn-remove {
      background: #dc3545;
      color: white;
      border: none;
      width: 30px;
      height: 30px;
      border-radius: 50%;
      cursor: pointer;
      font-size: 1.2rem;
      line-height: 1;
    }

    .btn-add-song {
      background: #28a745;
      color: white;
      border: none;
      padding: 0.75rem 1rem;
      border-radius: 4px;
      cursor: pointer;
      margin-bottom: 1rem;
    }

    .btn-primary {
      background: #007bff;
      color: white;
      border: none;
      padding: 0.75rem 2rem;
      border-radius: 4px;
      cursor: pointer;
      font-size: 1rem;
    }

    .btn-primary:disabled {
      background: #6c757d;
      cursor: not-allowed;
    }

    .playlists-list {
      background: white;
      padding: 2rem;
      border-radius: 8px;
      box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    }

    .playlist-cards {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
      gap: 1rem;
    }

    .playlist-card {
      border: 1px solid #ddd;
      border-radius: 8px;
      padding: 1rem;
      background: #f8f9fa;
    }

    .playlist-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 0.5rem;
    }

    .playlist-header h3 {
      margin: 0;
      color: #333;
    }

    .btn-delete {
      background: #dc3545;
      color: white;
      border: none;
      padding: 0.25rem 0.5rem;
      border-radius: 4px;
      cursor: pointer;
      font-size: 0.875rem;
    }

    .playlist-description {
      color: #666;
      margin-bottom: 0.5rem;
    }

    .songs-count {
      font-weight: 500;
      color: #007bff;
      margin-bottom: 1rem;
    }

    .songs-list {
      border-top: 1px solid #ddd;
      padding-top: 0.5rem;
    }

    .song-item {
      padding: 0.25rem 0;
      font-size: 0.875rem;
      color: #555;
    }

    .loading {
      text-align: center;
      padding: 2rem;
      color: #666;
    }

    .error-message {
      color: #dc3545;
      font-size: 0.875rem;
      margin-top: 0.5rem;
    }

    .no-playlists {
      text-align: center;
      padding: 2rem;
      color: #666;
      font-style: italic;
    }

    @media (max-width: 768px) {
      .form-row {
        grid-template-columns: 1fr;
      }
      
      .song-row {
        grid-template-columns: 1fr;
        gap: 0.5rem;
      }
      
      .playlist-cards {
        grid-template-columns: 1fr;
      }
    }
  `]
})
export class PlaylistsComponent implements OnInit {
  playlistForm: FormGroup;
  playlists: PlaylistResponseDTO[] = [];
  currentUser: any = null;
  
  createLoading = false;
  loadingPlaylists = false;
  createErrorMessage = '';
  playlistsErrorMessage = '';

  constructor(
    private formBuilder: FormBuilder,
    private playlistService: PlaylistService,
    private authService: AuthService,
    private router: Router
  ) {
    this.playlistForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.maxLength(100)]],
      description: ['', Validators.maxLength(500)],
      songs: this.formBuilder.array([])
    });

    // Agregar una canción inicial
    this.addSong();
  }

  ngOnInit(): void {
    this.authService.currentUser$.subscribe(user => {
      this.currentUser = user;
    });
    
    this.loadPlaylists();
  }

  get songs(): FormArray {
    return this.playlistForm.get('songs') as FormArray;
  }

  addSong(): void {
    const songForm = this.formBuilder.group({
      title: ['', [Validators.required, Validators.maxLength(200)]],
      artist: ['', [Validators.required, Validators.maxLength(100)]],
      album: ['', Validators.maxLength(150)],
      year: ['', [Validators.min(1900), Validators.max(2030)]],
      genre: ['', Validators.maxLength(50)]
    });
    
    this.songs.push(songForm);
  }

  removeSong(index: number): void {
    if (this.songs.length > 1) {
      this.songs.removeAt(index);
    }
  }

  createPlaylist(): void {
    if (this.playlistForm.valid) {
      this.createLoading = true;
      this.createErrorMessage = '';

      const formValue = this.playlistForm.value;
      
      // Filtrar canciones vacías
      const validSongs = formValue.songs.filter((song: SongRequestDTO) => 
        song.title.trim() && song.artist.trim()
      );

      if (validSongs.length === 0) {
        this.createErrorMessage = 'Debes agregar al menos una canción válida.';
        this.createLoading = false;
        return;
      }

      const playlistData: PlaylistRequestDTO = {
        name: formValue.name,
        description: formValue.description || undefined,
        songs: validSongs
      };

      this.playlistService.createPlaylist(playlistData).subscribe({
        next: (response) => {
          this.createLoading = false;
          if (response.success) {
            this.playlistForm.reset();
            this.songs.clear();
            this.addSong();
            this.loadPlaylists();
          } else {
            this.createErrorMessage = response.error?.detail.join(', ') || 'Error al crear la playlist';
          }
        },
        error: (error) => {
          this.createLoading = false;
          this.createErrorMessage = 'Error al crear la playlist. Por favor, intenta nuevamente.';
          console.error('Error creando playlist:', error);
        }
      });
    }
  }

  loadPlaylists(): void {
    this.loadingPlaylists = true;
    this.playlistsErrorMessage = '';

    this.playlistService.getAllPlaylists().subscribe({
      next: (response) => {
        this.loadingPlaylists = false;
        if (response.success) {
          this.playlists = response.data || [];
        } else {
          this.playlistsErrorMessage = response.error?.detail.join(', ') || 'Error al cargar las playlists';
        }
      },
      error: (error) => {
        this.loadingPlaylists = false;
        this.playlistsErrorMessage = 'Error al cargar las playlists.';
        console.error('Error cargando playlists:', error);
      }
    });
  }

  deletePlaylist(name: string): void {
    if (confirm(`¿Estás seguro de que quieres eliminar la playlist "${name}"?`)) {
      this.playlistService.deletePlaylistByName(name).subscribe({
        next: () => {
          this.loadPlaylists();
        },
        error: (error) => {
          console.error('Error eliminando playlist:', error);
          alert('Error al eliminar la playlist.');
        }
      });
    }
  }

  logout(): void {
    this.authService.logout().subscribe({
      next: () => {
        this.router.navigate(['/login']);
      },
      error: (error) => {
        console.error('Error durante logout:', error);
        this.router.navigate(['/login']);
      }
    });
  }
}
