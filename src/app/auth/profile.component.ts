import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';
@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule],
  template: `
    <main style="min-height:100vh; background-color:#f3f4f6; padding:2rem 1rem;">
      <section style="max-width:640px; margin:0 auto;">
        <div style="margin-bottom:1.5rem;">
          <h1 style="font-size:1.75rem; font-weight:700; margin:0 0 0.25rem 0;">
            Profile
          </h1>
          <p style="font-size:0.9rem; color:#6b7280; margin:0;">
            View your account details and role information.
          </p>
        </div>

        <div
          *ngIf="user; else guest"
          style="
            border-radius:1rem;
            background-color:#ffffff;
            padding:1.5rem;
            box-shadow:0 1px 3px rgba(15,23,42,0.12);
          "
        >
          <p><strong>Username:</strong> {{ user.username }}</p>
          <p><strong>Email:</strong> {{ user.email }}</p>
          <p><strong>Role:</strong> {{ user.role }}</p>
          <p><strong>Status:</strong> {{ user.status }}</p>
          <p><strong>Joined:</strong> {{ user.createdAt | date: 'mediumDate' }}</p>

          <button
            type="button"
            (click)="logout()"
            style="margin-top:1rem; padding:0.5rem 0.9rem; border-radius:999px; border:none; background-color:#ef4444; color:#f9fafb; font-size:0.85rem; cursor:pointer;"
          >
            Logout
          </button>
        </div>

        <ng-template #guest>
          <p style="font-size:0.9rem; color:#6b7280;">
            You are not logged in.
            <a routerLink="/login" style="color:#2563eb;">Login</a>
          </p>
        </ng-template>
      </section>
    </main>
  `,
})
export class ProfileComponent {
  constructor(
    private readonly auth: AuthService,
    private readonly router: Router
  ) {}

  get user() {
    return this.auth.currentUser;
  }

  logout(): void {
    this.auth.logout();
  }
}
