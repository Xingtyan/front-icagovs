import { Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';

export const routes: Routes = [
  // Login (público). Elige UNO solo. Aquí lo cargamos lazy desde tu carpeta "views/login"
  {
    path: 'login',
    loadComponent: () =>
      import('./views/login/login.component').then(m => m.LoginComponent),
    data: { title: 'Login' }
  },

  // Todo lo demás cuelga del layout (protegido)
  {
    path: '',
    loadComponent: () => import('./layout').then(m => m.DefaultLayoutComponent),
    canActivate: [AuthGuard],
    children: [
      // Certificates dentro del layout
      {
        path: 'certificates',
        loadComponent: () =>
          import('./views/certificates/certificates-list/certificates-list.component')
            .then(m => m.CertificatesListComponent),
        data: { title: 'Certificados' }
      },

      // (Opcional) el resto del menú de CoreUI que ya traía la plantilla:
      {
        path: 'dashboard',
        loadChildren: () => import('./views/dashboard/routes').then(m => m.routes)
      },
      {
        path: 'theme',
        loadChildren: () => import('./views/theme/routes').then(m => m.routes)
      },
      {
        path: 'base',
        loadChildren: () => import('./views/base/routes').then(m => m.routes)
      },
      {
        path: 'buttons',
        loadChildren: () => import('./views/buttons/routes').then(m => m.routes)
      },
      {
        path: 'forms',
        loadChildren: () => import('./views/forms/routes').then(m => m.routes)
      },
      {
        path: 'icons',
        loadChildren: () => import('./views/icons/routes').then(m => m.routes)
      },
      {
        path: 'notifications',
        loadChildren: () => import('./views/notifications/routes').then(m => m.routes)
      },
      {
        path: 'widgets',
        loadChildren: () => import('./views/widgets/routes').then(m => m.routes)
      },
      {
        path: 'charts',
        loadChildren: () => import('./views/charts/routes').then(m => m.routes)
      },
      {
        path: 'pages',
        loadChildren: () => import('./views/pages/routes').then(m => m.routes)
      },

      // Home dentro del layout → manda a certificates
      { path: '', pathMatch: 'full', redirectTo: 'certificates' }
    ]
  },

  // 404/500 (opcional)
  {
    path: '404',
    loadComponent: () => import('./views/pages/page404/page404.component').then(m => m.Page404Component)
  },
  {
    path: '500',
    loadComponent: () => import('./views/pages/page500/page500.component').then(m => m.Page500Component)
  },

  // Comodín final
  { path: '**', redirectTo: 'certificates' }
];
