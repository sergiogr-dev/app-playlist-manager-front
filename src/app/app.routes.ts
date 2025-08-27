import { Routes } from '@angular/router';
import { HomeComponent } from './components/home.component';
import { LoginComponent } from './components/login.component';
import { RegisterComponent } from './components/register.component';
import { PlaylistsComponent } from './components/playlists.component';
import { ApiStatusComponent } from './components/api-status.component';
import { AuthGuard } from './guards/auth.guard';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'playlists', component: PlaylistsComponent, canActivate: [AuthGuard] },
  { path: 'api-status', component: ApiStatusComponent },
  { path: '**', redirectTo: '/home' }
];
