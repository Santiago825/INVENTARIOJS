import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  constructor() { }

  // Almacenar el token en sessionStorage
  login(token: string): void {
    sessionStorage.setItem('auth_token', token);
  }

  // Obtener el token
  getToken(): string | null {
    return sessionStorage.getItem('auth_token');
  }

  // Verificar si el usuario está autenticado
  isAuthenticated(): boolean {
    return !!this.getToken(); // Si el token existe, el usuario está autenticado
  }

  // Cerrar sesión y eliminar el token
  logout(): void {
    sessionStorage.removeItem('auth_token');
  }
}