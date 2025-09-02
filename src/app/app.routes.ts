// app.routes.ts
import { Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { CertificateSearchComponent } from './views/certificates/certificate-search/certificate-search.component';

export const routes: Routes = [
  // ==================== RUTAS PÚBLICAS ====================
  // Estas rutas NO están protegidas y NO usan el layout principal
  {
    path: 'login',
    loadComponent: () =>
      import('./views/login/login.component').then(m => m.LoginComponent),
    data: { title: 'Login' }
  },
  {
    path: 'consultar-certificado',
    component: CertificateSearchComponent,
    data: { title: 'Consultar Certificado' }
  },

  // ==================== RUTA PRINCIPAL (PÚBLICA) ====================
  {
    path: '',
    component: CertificateSearchComponent, // ← Página de búsqueda como inicio
    data: { title: 'Inicio - Consulta de Certificados' }
  },

  // ==================== RUTAS PROTEGIDAS ====================
  // Estas rutas SÍ están protegidas y SÍ usan el layout principal
  {
    path: '',
    loadComponent: () => import('./layout').then(m => m.DefaultLayoutComponent),
    canActivate: [AuthGuard], // ← Protección con guard
    children: [
      // Certificados (admin)
      {
        path: 'certificates',
        loadComponent: () =>
          import('./views/certificates/certificates-list/certificates-list.component')
            .then(m => m.CertificatesListComponent),
        data: { title: 'Gestión de Certificados' }
      },
      
      // Dashboard
      {
        path: 'dashboard',
        loadChildren: () => import('./views/dashboard/routes').then(m => m.routes),
        data: { title: 'Dashboard' }
      },

      // Redirección por defecto dentro del área protegida
      { path: '', pathMatch: 'full', redirectTo: 'dashboard' }
    ]
  },

  // ==================== RUTAS DE ERROR ====================
  {
    path: '404',
    loadComponent: () => import('./views/pages/page404/page404.component').then(m => m.Page404Component),
    data: { title: 'Página no encontrada' }
  },
  {
    path: '500',
    loadComponent: () => import('./views/pages/page500/page500.component').then(m => m.Page500Component),
    data: { title: 'Error del servidor' }
  },

  // ==================== RUTA COMODÍN ====================
  { path: '**', redirectTo: '404' }
];