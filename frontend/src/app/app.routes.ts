import { Routes } from '@angular/router';
import { UrlComponent } from './url/url.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ROUTES } from './utils/routes';

export const routes: Routes = [
    {
        path: ROUTES.register,
        component: RegisterComponent,
    },
    {
        path: ROUTES.login,
        component: LoginComponent,
    },
    {
        path: ROUTES.url,
        component: UrlComponent,
    },
];
