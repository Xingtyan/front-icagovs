import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideHttpClient,withInterceptors , withInterceptorsFromDi } from '@angular/common/http';
import { jwtInterceptor } from './interceptors/jwt.interceptor';
import {
  provideRouter,
  withEnabledBlockingInitialNavigation,
  withHashLocation,
  withInMemoryScrolling,
  withRouterConfig,
  withViewTransitions
} from '@angular/router';

import { DropdownModule, SidebarModule } from '@coreui/angular';
import { IconSetService } from '@coreui/icons-angular';
import { routes } from './app.routes';
import { DatePipe, DecimalPipe } from '@angular/common';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes,
      withHashLocation(),
      withRouterConfig({
        onSameUrlNavigation: 'reload'
      }),
      withInMemoryScrolling({
        scrollPositionRestoration: 'top',
        anchorScrolling: 'enabled'
      }),
      withEnabledBlockingInitialNavigation(),
      withViewTransitions(),
    ),
    DatePipe,
    DecimalPipe,
    provideHttpClient(withInterceptorsFromDi(),withInterceptors([jwtInterceptor])),
    importProvidersFrom(SidebarModule, DropdownModule),
    IconSetService,
    provideAnimationsAsync()
  ]
};
