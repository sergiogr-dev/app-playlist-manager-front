import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SpotifyService } from '../services/spotify.service';

@Component({
  selector: 'app-api-status',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="api-status-container">
      <h2>Estado de la API</h2>
      
      <div class="status-card">
        <h3>🎵 Spotify Service</h3>
        <div class="status-indicator" [class.online]="spotifyStatus === 'online'" [class.offline]="spotifyStatus === 'offline'">
          {{ spotifyStatus === 'online' ? '🟢 Conectado' : '🔴 Desconectado' }}
        </div>
        <p *ngIf="spotifyStatus === 'online'">Mercados disponibles: {{ marketsCount }}</p>
        <p *ngIf="spotifyStatus === 'offline'">No se puede conectar con el servicio de Spotify</p>
      </div>

      <div class="endpoint-info">
        <h3>📋 Endpoints Disponibles</h3>
        <div class="endpoint-grid">
          <div class="endpoint-item">
            <strong>Autenticación</strong>
            <ul>
              <li>POST /api/v1/auth/login</li>
              <li>POST /api/v1/auth/register</li>
              <li>POST /api/v1/auth/logout</li>
              <li>GET /api/v1/auth/me</li>
            </ul>
          </div>
          
          <div class="endpoint-item">
            <strong>Playlists</strong>
            <ul>
              <li>GET /lists</li>
              <li>POST /lists</li>
              <li>GET /lists/{{ '{' }}name{{ '}' }}</li>
              <li>DELETE /lists/{{ '{' }}name{{ '}' }}</li>
            </ul>
          </div>
          
          <div class="endpoint-item">
            <strong>Spotify</strong>
            <ul>
              <li>GET /api/v1/spotify</li>
            </ul>
          </div>
        </div>
      </div>

      <div class="server-info">
        <h3>🖥️ Configuración del Servidor</h3>
        <p><strong>URL Base:</strong> http://localhost:8080</p>
        <p><strong>Autenticación:</strong> JWT Bearer Token</p>
        <p><strong>Formato:</strong> JSON</p>
      </div>
    </div>
  `,
  styles: [`
    .api-status-container {
      max-width: 800px;
      margin: 2rem auto;
      padding: 2rem;
      background: white;
      border-radius: 8px;
      box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    }

    h2 {
      text-align: center;
      color: #333;
      margin-bottom: 2rem;
    }

    .status-card {
      background: #f8f9fa;
      padding: 1.5rem;
      border-radius: 8px;
      margin-bottom: 2rem;
      border-left: 4px solid #007bff;
    }

    .status-card h3 {
      margin-bottom: 1rem;
      color: #333;
    }

    .status-indicator {
      font-weight: bold;
      padding: 0.5rem 1rem;
      border-radius: 20px;
      display: inline-block;
      margin-bottom: 1rem;
    }

    .status-indicator.online {
      background: #d4edda;
      color: #155724;
    }

    .status-indicator.offline {
      background: #f8d7da;
      color: #721c24;
    }

    .endpoint-info {
      margin-bottom: 2rem;
    }

    .endpoint-info h3 {
      color: #333;
      margin-bottom: 1rem;
    }

    .endpoint-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 1rem;
    }

    .endpoint-item {
      background: #f8f9fa;
      padding: 1rem;
      border-radius: 6px;
      border: 1px solid #dee2e6;
    }

    .endpoint-item strong {
      color: #007bff;
      display: block;
      margin-bottom: 0.5rem;
    }

    .endpoint-item ul {
      list-style: none;
      padding: 0;
      margin: 0;
    }

    .endpoint-item li {
      background: white;
      padding: 0.25rem 0.5rem;
      margin-bottom: 0.25rem;
      border-radius: 3px;
      font-family: 'Courier New', monospace;
      font-size: 0.875rem;
      border: 1px solid #e9ecef;
    }

    .server-info {
      background: #e3f2fd;
      padding: 1.5rem;
      border-radius: 8px;
      border-left: 4px solid #2196f3;
    }

    .server-info h3 {
      color: #333;
      margin-bottom: 1rem;
    }

    .server-info p {
      margin-bottom: 0.5rem;
      color: #555;
    }

    @media (max-width: 768px) {
      .api-status-container {
        margin: 1rem;
        padding: 1rem;
      }
      
      .endpoint-grid {
        grid-template-columns: 1fr;
      }
    }
  `]
})
export class ApiStatusComponent implements OnInit {
  spotifyStatus: 'online' | 'offline' | 'checking' = 'checking';
  marketsCount = 0;

  constructor(private spotifyService: SpotifyService) {}

  ngOnInit(): void {
    this.checkSpotifyService();
  }

  private checkSpotifyService(): void {
    this.spotifyService.getMarkets().subscribe({
      next: (response) => {
        if (response.success && response.data) {
          this.spotifyStatus = 'online';
          this.marketsCount = response.data.length;
        } else {
          this.spotifyStatus = 'offline';
        }
      },
      error: (error) => {
        console.log('Spotify service not available:', error);
        this.spotifyStatus = 'offline';
      }
    });
  }
}
