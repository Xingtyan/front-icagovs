// auth.guard.ts
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {

  constructor(private auth: AuthService, private router: Router) {}
  
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    console.log('🛡️ AuthGuard verificando acceso a:', state.url);
    
    // Lista de rutas públicas que NO requieren autenticación
    const publicRoutes = [
      '',
      '/',
      '/login',
      '/consultar-certificado',
      '/404',
      '/500'
    ];
    
    // Verificar si la ruta actual es pública
    const isPublicRoute = publicRoutes.includes(state.url);
    
    if (isPublicRoute) {
      console.log('🔓 Ruta pública, acceso permitido');
      return true;
    }
    
    // Verificar autenticación para rutas protegidas
    if (this.auth.isLoggedIn()) {
      console.log('✅ Usuario autenticado, acceso permitido');
      return true;
    }
    
    console.log('❌ Usuario no autenticado, redirigiendo al login');
    this.router.navigate(['/login'], { 
      queryParams: { returnUrl: state.url } 
    });
    return false;
  }
}