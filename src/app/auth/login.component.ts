import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  template: `
      <main style="min-height:100vh; display:flex; align-items:center; justify-content:center; background-color:#f5f9ff;">
      <section style="width:100%; max-width:420px; padding:2rem; border-radius:1rem; background-color:#ffffff; color:#1f2933; box-shadow:0 10px 30px rgba(15,23,42,0.15); border:1px solid #dbeafe;">
      <h1 style="font-size:1.5rem; font-weight:600; margin:0 0 0.25rem 0; color:#1d4ed8;">Sign in</h1>
      <p style="font-size:0.875rem; color:#6b7280; margin:0 0 1.5rem 0;">Please sign in to continue.</p>
      <form [formGroup]="form" (ngSubmit)="onSubmit()">
        <label style="display:block; font-size:0.8rem; margin-bottom:0.25rem; color:#374151;">
          Username or email
        </label>
        <input
          type="text"
          formControlName="identifier"
          style="width:100%; padding:0.5rem 0.75rem; border-radius:0.5rem; border:1px solid #cbd5f5; background:#ffffff; color:#111827; margin-bottom:0.5rem;"
        />
        <div *ngIf="form.controls['identifier'].invalid && form.controls['identifier'].touched" style="color:#dc2626; font-size:0.75rem; margin-bottom:0.5rem;">
          Identifier is required.
        </div>

        <label style="display:block; font-size:0.8rem; margin-bottom:0.25rem; color:#374151;">
          Password
        </label>
        <input
          type="password"
          formControlName="password"
          style="width:100%; padding:0.5rem 0.75rem; border-radius:0.5rem; border:1px solid #cbd5f5; background:#ffffff; color:#111827; margin-bottom:0.5rem;"
        />
        <div *ngIf="form.controls['password'].invalid && form.controls['password'].touched" style="color:#dc2626; font-size:0.75rem; margin-bottom:0.5rem;">
          Password is required.
        </div>

        <div *ngIf="loginError" style="color:#dc2626; font-size:0.8rem; margin-bottom:0.75rem;">
          Invalid credentials. Please try again.
        </div>

        <button
          type="submit"
          [disabled]="form.invalid"
          style="width:100%; padding:0.6rem 0.75rem; border-radius:999px; border:none; background:linear-gradient(90deg,#22c55e,#0ea5e9); color:#ffffff; font-weight:600; cursor:pointer;"
        >
          Login
        </button>
      </form>

      <p style="font-size:0.8rem; color:#6b7280; margin-top:1rem;">
        Don’t have an account?
        <a routerLink="/register" style="color:#0ea5e9; text-decoration:underline;">Register</a>
      </p>
    </section>
  </main>
  `,
})
export class LoginComponent {
  email = '';
  password = '';
  error = '';
  form: FormGroup;
  loginError = false;

  constructor(
    private readonly fb: FormBuilder,
    private readonly auth: AuthService,
    private readonly router: Router
  ) {
    this.form = this.fb.group({
      identifier: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  onSubmit(): void {
    this.loginError = false;
    if (this.form.invalid) return;

    const success = this.auth.login(this.form.value);
    if (!success) {
      this.loginError = true;
      return;
    }

     const user = this.auth.currentUser;
  if (user && user.role === 'ADMIN') {
    this.router.navigate(['/admin']);
  } else {
    this.router.navigate(['/vehicles']);
  }
}
}
