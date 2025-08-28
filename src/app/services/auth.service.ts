import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { isPlatformBrowser } from '@angular/common';
import { environment } from '../../environments/environment';
import { 
  AuthenticationRequest, 
  RegisterRequest, 
  AuthenticationResponse, 
  RefreshTokenRequest, 
  TokenValidationResponse 
} from '../models/api.models';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = `${environment.apiUrl}/api/v1/auth`;
  private currentUserSubject = new BehaviorSubject<TokenValidationResponse | null>(null);
  public currentUser$ = this.currentUserSubject.asObservable();

  constructor(
    private http: HttpClient,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    // Verificar si hay un token almacenado al inicializar el servicio
    if (isPlatformBrowser(this.platformId)) {
      this.checkStoredToken();
    }
  }

  private checkStoredToken(): void {
    const token = this.getToken();
    if (token) {
      this.verifyToken(token).subscribe({
        next: (response) => {
          if (response.valid) {
            this.currentUserSubject.next(response);
          } else {
            this.clearTokens();
          }
        },
        error: () => {
          this.clearTokens();
        }
      });
    }
  }

  login(credentials: AuthenticationRequest): Observable<AuthenticationResponse> {
    return this.http.post<AuthenticationResponse>(`${this.apiUrl}/login`, credentials)
      .pipe(
        tap(response => {
          if (response.accessToken && isPlatformBrowser(this.platformId)) {
            localStorage.setItem('accessToken', response.accessToken);
            localStorage.setItem('refreshToken', response.refreshToken);
            this.getCurrentUser();
          }
        })
      );
  }

  register(userData: RegisterRequest): Observable<AuthenticationResponse> {
    return this.http.post<AuthenticationResponse>(`${this.apiUrl}/register`, userData)
      .pipe(
        tap(response => {
          if (response.accessToken && isPlatformBrowser(this.platformId)) {
            localStorage.setItem('accessToken', response.accessToken);
            localStorage.setItem('refreshToken', response.refreshToken);
            this.getCurrentUser();
          }
        })
      );
  }

  logout(): Observable<any> {
    if (!isPlatformBrowser(this.platformId)) {
      this.clearTokens();
      return new Observable(observer => {
        observer.next(null);
        observer.complete();
      });
    }

    const refreshToken = localStorage.getItem('refreshToken');
    if (refreshToken) {
      const request: RefreshTokenRequest = { refreshToken };
      return this.http.post(`${this.apiUrl}/logout`, request)
        .pipe(
          tap(() => {
            this.clearTokens();
          })
        );
    } else {
      this.clearTokens();
      return new Observable(observer => {
        observer.next(null);
        observer.complete();
      });
    }
  }

  refreshToken(): Observable<AuthenticationResponse> {
    if (!isPlatformBrowser(this.platformId)) {
      throw new Error('Refresh token not available in server environment');
    }

    const refreshToken = localStorage.getItem('refreshToken');
    if (!refreshToken) {
      throw new Error('No refresh token available');
    }

    const request: RefreshTokenRequest = { refreshToken };
    return this.http.post<AuthenticationResponse>(`${this.apiUrl}/refresh`, request)
      .pipe(
        tap(response => {
          if (response.accessToken) {
            localStorage.setItem('accessToken', response.accessToken);
            localStorage.setItem('refreshToken', response.refreshToken);
          }
        })
      );
  }

  verifyToken(token: string): Observable<TokenValidationResponse> {
    return this.http.get<TokenValidationResponse>(`${this.apiUrl}/verify-token?token=${token}`);
  }

  getCurrentUser(): void {
    const token = this.getToken();
    if (token) {
      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
      this.http.get<TokenValidationResponse>(`${this.apiUrl}/me`, { headers })
        .subscribe({
          next: (user) => {
            this.currentUserSubject.next(user);
          },
          error: () => {
            this.clearTokens();
          }
        });
    }
  }

  getToken(): string | null {
    if (isPlatformBrowser(this.platformId)) {
      return localStorage.getItem('accessToken');
    }
    return null;
  }

  getRefreshToken(): string | null {
    if (isPlatformBrowser(this.platformId)) {
      return localStorage.getItem('refreshToken');
    }
    return null;
  }

  isLoggedIn(): boolean {
    const token = this.getToken();
    return !!token;
  }

  getCurrentUserValue(): TokenValidationResponse | null {
    return this.currentUserSubject.value;
  }

  private clearTokens(): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
    }
    this.currentUserSubject.next(null);
  }
}
