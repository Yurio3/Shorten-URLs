import { Component } from '@angular/core';
import { GoogleLoginComponent } from '../google-login/google-login.component';

import { ReactiveFormsModule } from '@angular/forms';
import {
  SocialLoginModule,
} from '@abacritt/angularx-social-login';
import { CommonModule } from '@angular/common';
import { SocialAuthService } from '@abacritt/angularx-social-login';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [GoogleLoginComponent, SocialLoginModule, CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  authSubscription!: Subscription;

  constructor(private authService: SocialAuthService) {}
  ngOnDestroy(): void {
    this.authSubscription.unsubscribe();
  }

  ngOnInit() {
    this.authSubscription = this.authService.authState.subscribe((user) => {
      console.log(user);
    });
  }

  googleSignin(googleWrapper: any) {
    googleWrapper.click();
  }
}
