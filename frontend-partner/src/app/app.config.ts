import {
  ApplicationConfig,
  inject,
  provideZoneChangeDetection,
} from '@angular/core';
import { provideRouter } from '@angular/router';

import { provideHttpClient } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { InMemoryCache } from '@apollo/client/core';
import { setContext } from '@apollo/client/link/context';
import { provideApollo } from 'apollo-angular';
import { HttpLink } from 'apollo-angular/http';
import { provideToastr } from 'ngx-toastr';
import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(),
    provideAnimations(),
    provideToastr(), //
    provideApollo(() => {
      const httpLink = inject(HttpLink);
      const authLink = setContext((_, { headers }) => {
        const token = JSON.parse(localStorage.getItem('token') as string);

        return {
          headers: {
            ...headers,
            authorization: token ? `Bearer ${token}` : '',
          },
        };
      });

      return {
        link: authLink.concat(
          httpLink.create({
            uri: 'http://localhost:4600/graphql',
          })
        ),
        cache: new InMemoryCache(),
      };
    }),
    provideAnimationsAsync(),
  ],
};
