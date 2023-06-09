import { Routes } from '@angular/router';
import { HomePage } from './home/home.page';
import { LoginComponent } from './components/login/login.component';
import { RegistroComponent } from './components/registro/registro.component';

export const routes: Routes = [  
  {
    path: 'home',
    loadComponent: () => import('./home/home.page').then((m) => m.HomePage),
  }, 
  {
    path: 'registro',
    loadComponent: () => import('./components/registro/registro.component').then((m) => m.RegistroComponent),
  },
  {
    path: 'login',
    loadComponent: () => import('./components/login/login.component').then((m) => m.LoginComponent),
  },
  {
    path: 'sala4a',
    loadComponent: () => import('./pages/sala4a/sala4a.component').then((m) => m.Sala4aComponent),
  },
  {
    path: 'sala4b',
    loadComponent: () => import('./pages/sala4b/sala4b.component').then((m) => m.Sala4bComponent),
  },
  {
    path: 'splash',
    loadComponent: () => import('./splash/splash.page').then( m => m.SplashPage)
  },
  {
    path: '',
    redirectTo: 'splash',
    pathMatch: 'full',
  },
  {
    path: 'error',
    loadComponent: () => import('./components/error/error.component').then((m) => m.ErrorComponent),
  },
  {
    path: '**',
    redirectTo: '/error'
  },
];
