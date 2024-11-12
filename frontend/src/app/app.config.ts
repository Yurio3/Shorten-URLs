import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { HTTP_INTERCEPTORS, HttpClientModule, provideHttpClient, withFetch } from '@angular/common/http';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import {
  SocialAuthServiceConfig,
} from '@abacritt/angularx-social-login';
import { GoogleLoginProvider } from '@abacritt/angularx-social-login';
import { AuthInterceptor } from './utils/auth.intercetpr';

export const appConfig: ApplicationConfig = {
  providers: [ importProvidersFrom(HttpClientModule),       {
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true
}
,provideRouter(routes), provideHttpClient(withFetch()), provideAnimationsAsync(), {
    provide: 'SocialAuthServiceConfig',
    useValue: {
      autoLogin: false,
      providers: [
        {
          id: GoogleLoginProvider.PROVIDER_ID,
          provider: new GoogleLoginProvider('258444461314-eos33s7j7gjmp50s7c9tqmetvl9ooauu.apps.googleusercontent.com'),
        },
  ],
    } as SocialAuthServiceConfig,
  },],
};
