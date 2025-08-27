import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { TokenValidationResponse } from '../models/api.models';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <nav class="navbar">
      <div class="navbar-container">
        <div class="navbar-brand">
          <a routerLink="/" class="brand-link">🎵 Playlist Manager</a>
        </div>

        <div class="navbar-menu" [class.active]="menuOpen">
          <div class="navbar-nav">
            <a routerLink="/home" class="nav-link" routerLinkActive="active">Inicio</a>
            <a routerLink="/api-status" class="nav-link" routerLinkActive="active">Estado API</a>
            
            <div *ngIf="!currentUser" class="nav-auth">
              <a routerLink="/login" class="nav-link" routerLinkActive="active">Iniciar Sesión</a>
              <a routerLink="/register" class="nav-link nav-register" routerLinkActive="active">Registrarse</a>
            </div>
            
            <div *ngIf="currentUser" class="nav-user">
              <a routerLink="/playlists" class="nav-link" routerLinkActive="active">Mis Playlists</a>
              <div class="user-menu">
                <span class="user-name">{{ currentUser.username }}</span>
                <button (click)="logout()" class="logout-btn">Cerrar Sesión</button>
              </div>
            </div>
          </div>
        </div>

        <div class="navbar-toggle" (click)="toggleMenu()">
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
    </nav>
  `,
  styles: [`
    .navbar {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      padding: 0;
      box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
      position: sticky;
      top: 0;
      z-index: 1000;
    }

    .navbar-container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 0 1rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
      height: 60px;
    }

    .navbar-brand .brand-link {
      color: white;
      text-decoration: none;
      font-size: 1.5rem;
      font-weight: bold;
      display: flex;
      align-items: center;
    }

    .navbar-menu {
      display: flex;
      align-items: center;
    }

    .navbar-nav {
      display: flex;
      align-items: center;
      gap: 1rem;
    }

    .nav-link {
      color: rgba(255, 255, 255, 0.9);
      text-decoration: none;
      padding: 0.5rem 1rem;
      border-radius: 20px;
      transition: all 0.3s ease;
      font-weight: 500;
    }

    .nav-link:hover {
      color: white;
      background: rgba(255, 255, 255, 0.1);
    }

    .nav-link.active {
      color: white;
      background: rgba(255, 255, 255, 0.2);
    }

    .nav-register {
      background: rgba(255, 255, 255, 0.2);
      border: 1px solid rgba(255, 255, 255, 0.3);
    }

    .nav-register:hover {
      background: rgba(255, 255, 255, 0.3);
    }

    .nav-auth {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      margin-left: 1rem;
    }

    .nav-user {
      display: flex;
      align-items: center;
      gap: 1rem;
      margin-left: 1rem;
    }

    .user-menu {
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }

    .user-name {
      color: rgba(255, 255, 255, 0.9);
      font-weight: 500;
    }

    .logout-btn {
      background: rgba(220, 53, 69, 0.8);
      color: white;
      border: none;
      padding: 0.375rem 0.75rem;
      border-radius: 15px;
      cursor: pointer;
      font-size: 0.875rem;
      transition: all 0.3s ease;
    }

    .logout-btn:hover {
      background: rgba(220, 53, 69, 1);
    }

    .navbar-toggle {
      display: none;
      flex-direction: column;
      cursor: pointer;
      gap: 3px;
    }

    .navbar-toggle span {
      width: 25px;
      height: 3px;
      background: white;
      border-radius: 2px;
      transition: 0.3s;
    }

    @media (max-width: 768px) {
      .navbar-menu {
        position: fixed;
        top: 60px;
        left: 0;
        right: 0;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        flex-direction: column;
        padding: 1rem;
        transform: translateX(-100%);
        transition: transform 0.3s ease;
        box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
      }

      .navbar-menu.active {
        transform: translateX(0);
      }

      .navbar-nav {
        flex-direction: column;
        gap: 0.5rem;
        width: 100%;
      }

      .nav-auth,
      .nav-user {
        flex-direction: column;
        gap: 0.5rem;
        margin-left: 0;
        width: 100%;
      }

      .user-menu {
        flex-direction: column;
        gap: 0.5rem;
      }

      .nav-link {
        padding: 0.75rem 1rem;
        text-align: center;
        width: 100%;
      }

      .navbar-toggle {
        display: flex;
      }

      .navbar-toggle.active span:nth-child(1) {
        transform: rotate(45deg) translate(5px, 5px);
      }

      .navbar-toggle.active span:nth-child(2) {
        opacity: 0;
      }

      .navbar-toggle.active span:nth-child(3) {
        transform: rotate(-45deg) translate(7px, -6px);
      }
    }
  `]
})
export class NavbarComponent implements OnInit {
  currentUser: TokenValidationResponse | null = null;
  menuOpen = false;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.authService.currentUser$.subscribe(user => {
      this.currentUser = user;
    });
  }

  toggleMenu(): void {
    this.menuOpen = !this.menuOpen;
  }

  logout(): void {
    this.authService.logout().subscribe({
      next: () => {
        this.router.navigate(['/home']);
        this.menuOpen = false;
      },
      error: (error) => {
        console.error('Error durante logout:', error);
        this.router.navigate(['/home']);
        this.menuOpen = false;
      }
    });
  }
}
