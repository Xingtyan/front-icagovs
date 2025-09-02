import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';

export const jwtInterceptor: HttpInterceptorFn = (req, next) => {
  const token = localStorage.getItem('jwt');

  const isAuthCall = req.url.includes('/auth/login');
  const isPublicCertificate = req.url.includes('/auth/certificates/'); // Rutas públicas de certificados
  const isRegisterCall = req.url.includes('/auth/register'); // Si register es público

  // Solo agregar token si existe y NO es una llamada pública
  if (token && !isAuthCall && !isPublicCertificate && !isRegisterCall) {
    req = req.clone({ setHeaders: { Authorization: `Bearer ${token}` } });
  }


  return next(req).pipe(
    catchError(err => {
      if (err.status === 401) {
        // Solo redirigir al login si es una ruta protegida
        // No redirigir para errores 401 en rutas públicas
        const isPublicRequest = req.url.includes('/auth/certificates/') ||
          req.url.includes('/auth/register');

        if (!isPublicRequest) {
          localStorage.removeItem('jwt');
          const router = inject(Router);
          router.navigateByUrl('/login');
        }
      }
      return throwError(() => err);
    })
  );
};

