import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthServiceService } from '../services/negocio/autenticacion/auth-service.service';  // Importa el servicio de autenticación

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthServiceService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    // Verificar si el usuario está autenticado (es decir, si hay un token en sessionStorage)
    if (this.authService.isAuthenticated()) {
      return true; // Permitir acceso
    } else {
      // Redirigir al login si el usuario no está autenticado
      this.router.navigate(['/login']);
      return false; // Bloquear acceso
    }
  }
}
