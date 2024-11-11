import { Component, inject } from '@angular/core';
import { GoogleLoginComponent } from '../google-login/google-login.component';

import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import {
  SocialLoginModule,
} from '@abacritt/angularx-social-login';
import { CommonModule } from '@angular/common';
import { SocialAuthService } from '@abacritt/angularx-social-login';
import { Subscription } from 'rxjs';
import { UserService } from '../services/user.service';
import { User } from '../model/user';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    GoogleLoginComponent,
    SocialLoginModule,
    CommonModule,
    ReactiveFormsModule,
    MatLabel,
    MatFormField,
    MatInput,
    MatButtonModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  authSubscription!: Subscription;

  constructor(
    private authService: SocialAuthService,
    private userService: UserService,

    private formBuilder: FormBuilder,
    private router: Router,

  ) { }
  ngOnDestroy(): void {
    this.authSubscription.unsubscribe();
  }

  ngOnInit() {
    this.authSubscription = this.authService.authState.subscribe((user) => {
      this.userService.register(user as unknown as User).subscribe(() => { 
        this.router.navigate(['/url']);
      })
    });

    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
    })

  }

  googleSignin(googleWrapper: any) {
    googleWrapper.click();
  }





  private _snackBar = inject(MatSnackBar);
  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action);
  }

  loginForm!: FormGroup;


  login() {
    this.userService.register(this.loginForm.value).subscribe(() => {
      this.router.navigate(['/url']);
    }, () => {
      this._snackBar.open("ERROR!", "CLOSE");
    })
  }

}
