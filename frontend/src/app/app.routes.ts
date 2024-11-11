import { Routes } from '@angular/router';
import { UrlComponent } from './url/url.component';
import { LoginComponent } from './login/login.component';

export const routes: Routes = [
    {
        path: 'url',
        component: UrlComponent,
    },
    {
        path: 'login',
        component: LoginComponent,
    }
];
