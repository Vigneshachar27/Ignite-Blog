import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';
import { RouterLink } from '@angular/router';
@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <main style="min-height:100vh; display:flex; align-items:center; justify-content:center; background-color:#f5f9ff;">
  <section style="width:100%; max-width:460px; padding:2rem; border-radius:1rem; background-color:#ffffff; color:#1f2933; box-shadow:0 10px 30px rgba(15,23,42,0.15); border:1px solid #dbeafe;">
    <h1 style="font-size:1.5rem; font-weight:600; margin:0 0 0.25rem 0; color:#1d4ed8;">
      Create account
    </h1>
    <p style="font-size:0.875rem; color:#6b7280; margin:0 0 1.5rem 0;">
      Register to save your favourite bikes and cars.
    </p>

    <form [formGroup]="form" (ngSubmit)="onSubmit()">
      <label style="display:block; font-size:0.8rem; margin-bottom:0.25rem; color:#374151;">
        Username
      </label>
      <input
        type="text"
        formControlName="username"
        style="width:100%; padding:0.5rem 0.75rem; border-radius:0.5rem; border:1px solid #cbd5f5; background:#ffffff; color:#111827; margin-bottom:0.25rem;"
      />
      <div *ngIf="form.controls['username'].invalid && form.controls['username'].touched" style="color:#dc2626; font-size:0.75rem; margin-bottom:0.5rem;">
        Username is required (min 3 characters).
      </div>

      <label style="display:block; font-size:0.8rem; margin-bottom:0.25rem; color:#374151;">
        Email
      </label>
      <input
        type="email"
        formControlName="email"
        style="width:100%; padding:0.5rem 0.75rem; border-radius:0.5rem; border:1px solid #cbd5f5; background:#ffffff; color:#111827; margin-bottom:0.25rem;"
      />
      <div *ngIf="form.controls['email'].invalid && form.controls['email'].touched" style="color:#dc2626; font-size:0.75rem; margin-bottom:0.5rem;">
        Valid email is required.
      </div>

      <label style="display:block; font-size:0.8rem; margin-bottom:0.25rem; color:#374151;">
        Password
      </label>
      <input
        type="password"
        formControlName="password"
        style="width:100%; padding:0.5rem 0.75rem; border-radius:0.5rem; border:1px solid #cbd5f5; background:#ffffff; color:#111827; margin-bottom:0.25rem;"
      />
      <div *ngIf="form.controls['password'].invalid && form.controls['password'].touched" style="color:#dc2626; font-size:0.75rem; margin-bottom:0.5rem;">
        Password must be at least 6 characters.
      </div>

      <label style="display:block; font-size:0.8rem; margin-bottom:0.25rem; color:#374151;">
        Confirm password
      </label>
      <input
        type="password"
        formControlName="confirmPassword"
        style="width:100%; padding:0.5rem 0.75rem; border-radius:0.5rem; border:1px solid #cbd5f5; background:#ffffff; color:#111827; margin-bottom:0.25rem;"
      />
      <div *ngIf="passwordsDoNotMatch && form.controls['confirmPassword'].touched" style="color:#dc2626; font-size:0.75rem; margin-bottom:0.5rem;">
        Passwords do not match.
      </div>

      <div *ngIf="registerError" style="color:#dc2626; font-size:0.8rem; margin-bottom:0.75rem;">
        Username or email already exists.
      </div>

      <button
        type="submit"
        [disabled]="form.invalid || passwordsDoNotMatch"
        style="width:100%; padding:0.6rem 0.75rem; border-radius:999px; border:none; background:linear-gradient(90deg,#22c55e,#0ea5e9); color:#ffffff; font-weight:600; cursor:pointer;"
      >
        Register
      </button>
    </form>

    <p style="font-size:0.8rem; color:#6b7280; margin-top:1rem;">
      Already have an account?
      <a routerLink="/login" style="color:#0ea5e9; text-decoration:underline;">Login</a>
    </p>
  </section>
</main>

  `,
})
export class RegisterComponent {
  form: FormGroup;
  registerError = false;

  constructor(
    private readonly fb: FormBuilder,
    private readonly auth: AuthService,
    private readonly router: Router
  ) {
    this.form = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required],
    });
  }

  get passwordsDoNotMatch(): boolean {
    const { password, confirmPassword } = this.form.value;
    return password && confirmPassword && password !== confirmPassword;
  }

  onSubmit(): void {
    this.registerError = false;
    if (this.form.invalid || this.passwordsDoNotMatch) return;

    const { username, email, password } = this.form.value;
    const user = this.auth.register({ username, email, password });
    if (!user) {
      this.registerError = true;
      return;
    }

    this.router.navigate(['/login']);
  }
}
