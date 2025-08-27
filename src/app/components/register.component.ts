import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../services/auth.service';
import { RegisterRequest } from '../models/api.models';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <div class="register-container">
      <div class="register-form">
        <h2>Registrarse</h2>
        <form [formGroup]="registerForm" (ngSubmit)="onSubmit()">
          <div class="form-group">
            <label for="username">Usuario:</label>
            <input 
              type="text" 
              id="username" 
              formControlName="username" 
              class="form-control"
              [class.error]="registerForm.get('username')?.invalid && registerForm.get('username')?.touched"
            >
            <div class="error-message" *ngIf="registerForm.get('username')?.invalid && registerForm.get('username')?.touched">
              El usuario debe tener entre 3 y 50 caracteres
            </div>
          </div>

          <div class="form-group">
            <label for="email">Email:</label>
            <input 
              type="email" 
              id="email" 
              formControlName="email" 
              class="form-control"
              [class.error]="registerForm.get('email')?.invalid && registerForm.get('email')?.touched"
            >
            <div class="error-message" *ngIf="registerForm.get('email')?.invalid && registerForm.get('email')?.touched">
              Ingresa un email válido
            </div>
          </div>

          <div class="form-group">
            <label for="firstName">Nombre:</label>
            <input 
              type="text" 
              id="firstName" 
              formControlName="firstName" 
              class="form-control"
              [class.error]="registerForm.get('firstName')?.invalid && registerForm.get('firstName')?.touched"
            >
            <div class="error-message" *ngIf="registerForm.get('firstName')?.invalid && registerForm.get('firstName')?.touched">
              El nombre es requerido y debe tener máximo 50 caracteres
            </div>
          </div>

          <div class="form-group">
            <label for="lastName">Apellido:</label>
            <input 
              type="text" 
              id="lastName" 
              formControlName="lastName" 
              class="form-control"
              [class.error]="registerForm.get('lastName')?.invalid && registerForm.get('lastName')?.touched"
            >
            <div class="error-message" *ngIf="registerForm.get('lastName')?.invalid && registerForm.get('lastName')?.touched">
              El apellido es requerido y debe tener máximo 50 caracteres
            </div>
          </div>

          <div class="form-group">
            <label for="password">Contraseña:</label>
            <input 
              type="password" 
              id="password" 
              formControlName="password" 
              class="form-control"
              [class.error]="registerForm.get('password')?.invalid && registerForm.get('password')?.touched"
            >
            <div class="error-message" *ngIf="registerForm.get('password')?.invalid && registerForm.get('password')?.touched">
              La contraseña debe tener entre 8 y 100 caracteres
            </div>
          </div>

          <button type="submit" [disabled]="registerForm.invalid || loading" class="btn-primary">
            {{ loading ? 'Registrando...' : 'Registrarse' }}
          </button>

          <div class="error-message" *ngIf="errorMessage">
            {{ errorMessage }}
          </div>
        </form>

        <div class="login-link">
          <p>¿Ya tienes cuenta? <a (click)="goToLogin()">Inicia sesión aquí</a></p>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .register-container {
      display: flex;
      justify-content: center;
      align-items: center;
      min-height: calc(100vh - 60px);
      background-color: #f5f5f5;
      padding: 1rem;
    }

    .register-form {
      background: white;
      padding: 2rem;
      border-radius: 8px;
      box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
      width: 100%;
      max-width: 400px;
    }

    h2 {
      text-align: center;
      margin-bottom: 1.5rem;
      color: #333;
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

    .form-control.error {
      border-color: #dc3545;
    }

    .btn-primary {
      width: 100%;
      padding: 0.75rem;
      background-color: #007bff;
      color: white;
      border: none;
      border-radius: 4px;
      font-size: 1rem;
      cursor: pointer;
      transition: background-color 0.2s;
    }

    .btn-primary:hover:not(:disabled) {
      background-color: #0056b3;
    }

    .btn-primary:disabled {
      background-color: #6c757d;
      cursor: not-allowed;
    }

    .error-message {
      color: #dc3545;
      font-size: 0.875rem;
      margin-top: 0.25rem;
    }

    .login-link {
      text-align: center;
      margin-top: 1rem;
    }

    .login-link a {
      color: #007bff;
      cursor: pointer;
      text-decoration: none;
    }

    .login-link a:hover {
      text-decoration: underline;
    }
  `]
})
export class RegisterComponent {
  registerForm: FormGroup;
  loading = false;
  errorMessage = '';

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.registerForm = this.formBuilder.group({
      username: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
      email: ['', [Validators.required, Validators.email]],
      firstName: ['', [Validators.required, Validators.maxLength(50)]],
      lastName: ['', [Validators.required, Validators.maxLength(50)]],
      password: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(100)]]
    });
  }

  onSubmit(): void {
    if (this.registerForm.valid) {
      this.loading = true;
      this.errorMessage = '';

      const userData: RegisterRequest = this.registerForm.value;

      this.authService.register(userData).subscribe({
        next: (response) => {
          this.loading = false;
          this.router.navigate(['/playlists']);
        },
        error: (error) => {
          this.loading = false;
          if (error.status === 409) {
            this.errorMessage = 'El usuario o email ya existe. Por favor, usa otros datos.';
          } else {
            this.errorMessage = 'Error al registrar el usuario. Por favor, intenta nuevamente.';
          }
          console.error('Error de registro:', error);
        }
      });
    }
  }

  goToLogin(): void {
    this.router.navigate(['/login']);
  }
}
