import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="home-container">
      <div class="hero-section">
        <h1>🎵 Playlist Manager</h1>
        <p class="hero-subtitle">Organiza y gestiona tu música favorita</p>
        <div class="hero-buttons">
          <button (click)="goToLogin()" class="btn-primary">Iniciar Sesión</button>
          <button (click)="goToRegister()" class="btn-secondary">Registrarse</button>
          <button (click)="goToApiStatus()" class="btn-secondary">Estado API</button>
        </div>
      </div>

      <div class="features-section">
        <h2>Características</h2>
        <div class="features-grid">
          <div class="feature-card">
            <div class="feature-icon">🔐</div>
            <h3>Autenticación Segura</h3>
            <p>Sistema de login con JWT y gestión segura de tokens</p>
          </div>
          
          <div class="feature-card">
            <div class="feature-icon">📝</div>
            <h3>Gestión de Playlists</h3>
            <p>Crea, edita y organiza tus playlists musicales</p>
          </div>
          
          <div class="feature-card">
            <div class="feature-icon">🎵</div>
            <h3>Catálogo de Canciones</h3>
            <p>Agrega canciones con información detallada</p>
          </div>
          
          <div class="feature-card">
            <div class="feature-icon">📱</div>
            <h3>Diseño Responsivo</h3>
            <p>Funciona perfectamente en todos los dispositivos</p>
          </div>
        </div>
      </div>

      <div class="api-info">
        <h2>API Endpoints</h2>
        <div class="endpoint-list">
          <div class="endpoint-group">
            <h3>Autenticación</h3>
            <ul>
              <li><code>POST /api/v1/auth/login</code> - Iniciar sesión</li>
              <li><code>POST /api/v1/auth/register</code> - Registrar usuario</li>
              <li><code>POST /api/v1/auth/logout</code> - Cerrar sesión</li>
            </ul>
          </div>
          
          <div class="endpoint-group">
            <h3>Playlists</h3>
            <ul>
              <li><code>GET /lists</code> - Obtener playlists</li>
              <li><code>POST /lists</code> - Crear playlist</li>
              <li><code>DELETE /lists/{{ '{' }}name{{ '}' }}</code> - Eliminar playlist</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .home-container {
      min-height: calc(100vh - 60px);
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
    }

    .hero-section {
      text-align: center;
      padding: 4rem 2rem;
    }

    .hero-section h1 {
      font-size: 3.5rem;
      margin-bottom: 1rem;
      text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
    }

    .hero-subtitle {
      font-size: 1.25rem;
      margin-bottom: 2rem;
      opacity: 0.9;
    }

    .hero-buttons {
      display: flex;
      gap: 1rem;
      justify-content: center;
      flex-wrap: wrap;
    }

    .hero-buttons button {
      padding: 1rem 2rem;
      font-size: 1.1rem;
      border-radius: 25px;
      border: none;
      cursor: pointer;
      transition: all 0.3s ease;
      min-width: 150px;
    }

    .btn-primary {
      background: #007bff;
      color: white;
    }

    .btn-primary:hover {
      background: #0056b3;
      transform: translateY(-2px);
    }

    .btn-secondary {
      background: rgba(255, 255, 255, 0.2);
      color: white;
      border: 2px solid rgba(255, 255, 255, 0.3);
    }

    .btn-secondary:hover {
      background: rgba(255, 255, 255, 0.3);
      transform: translateY(-2px);
    }

    .features-section {
      padding: 4rem 2rem;
      background: rgba(255, 255, 255, 0.1);
      backdrop-filter: blur(10px);
    }

    .features-section h2 {
      text-align: center;
      font-size: 2.5rem;
      margin-bottom: 3rem;
    }

    .features-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 2rem;
      max-width: 1000px;
      margin: 0 auto;
    }

    .feature-card {
      background: rgba(255, 255, 255, 0.1);
      padding: 2rem;
      border-radius: 15px;
      text-align: center;
      backdrop-filter: blur(5px);
      border: 1px solid rgba(255, 255, 255, 0.2);
      transition: transform 0.3s ease;
    }

    .feature-card:hover {
      transform: translateY(-5px);
    }

    .feature-icon {
      font-size: 3rem;
      margin-bottom: 1rem;
    }

    .feature-card h3 {
      font-size: 1.25rem;
      margin-bottom: 1rem;
    }

    .feature-card p {
      opacity: 0.9;
      line-height: 1.6;
    }

    .api-info {
      padding: 4rem 2rem;
      background: rgba(0, 0, 0, 0.2);
    }

    .api-info h2 {
      text-align: center;
      font-size: 2.5rem;
      margin-bottom: 3rem;
    }

    .endpoint-list {
      max-width: 800px;
      margin: 0 auto;
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 2rem;
    }

    .endpoint-group {
      background: rgba(255, 255, 255, 0.1);
      padding: 2rem;
      border-radius: 10px;
      backdrop-filter: blur(5px);
    }

    .endpoint-group h3 {
      font-size: 1.5rem;
      margin-bottom: 1rem;
      color: #ffd700;
    }

    .endpoint-group ul {
      list-style: none;
      padding: 0;
    }

    .endpoint-group li {
      margin-bottom: 0.5rem;
      opacity: 0.9;
    }

    .endpoint-group code {
      background: rgba(0, 0, 0, 0.3);
      padding: 0.25rem 0.5rem;
      border-radius: 4px;
      font-family: 'Courier New', monospace;
      color: #00ff88;
    }

    @media (max-width: 768px) {
      .hero-section h1 {
        font-size: 2.5rem;
      }
      
      .hero-buttons {
        flex-direction: column;
        align-items: center;
      }
      
      .features-section,
      .api-info {
        padding: 2rem 1rem;
      }
      
      .features-section h2,
      .api-info h2 {
        font-size: 2rem;
      }
    }
  `]
})
export class HomeComponent {
  constructor(private router: Router) {}

  goToLogin(): void {
    this.router.navigate(['/login']);
  }

  goToRegister(): void {
    this.router.navigate(['/register']);
  }

  goToApiStatus(): void {
    this.router.navigate(['/api-status']);
  }
}
