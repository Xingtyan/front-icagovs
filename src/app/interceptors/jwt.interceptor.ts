import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';

export const jwtInterceptor: HttpInterceptorFn = (req, next) => {
  const token = localStorage.getItem('jwt');

  // no agregamos a login
  const isAuthCall = req.url.includes('/auth/login');

  if (token && !isAuthCall) {
    req = req.clone({ setHeaders: { Authorization: `Bearer ${token}` } });
  }

  return next(req).pipe(
    catchError(err => {
      if (err.status === 401) {
        // si expira o es inválido, saca al login
        localStorage.removeItem('jwt');
        const router = inject(Router);
        router.navigateByUrl('/login');
      }
      return throwError(() => err);
    })
  );
};

