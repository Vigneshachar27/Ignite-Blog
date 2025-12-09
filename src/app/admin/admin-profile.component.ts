import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-admin-profile',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="admin-profile-page">
      <div class="admin-profile-card">
        <div class="admin-profile-header">
          <div class="admin-profile-avatar">A</div>
          <div>
            <h2>Admin User</h2>
            <p class="muted">admin@example.com</p>
          </div>
        </div>

        <div class="admin-profile-body">
          <div class="row">
            <span class="label">Role</span>
            <span class="value">Administrator</span>
          </div>
          <div class="row">
            <span class="label">Username</span>
            <span class="value">admin</span>
          </div>
        </div>

        <button class="back-btn" routerLink="/admin">
          Back to Dashboard
        </button>
        <button class="logout-btn" (click)="onLogout()">
            Logout
          </button>
      </div>
    </div>
  `,
  styles: [`
    .admin-profile-page {
      display: flex;
      justify-content: center;
      align-items: flex-start;
      padding: 1.5rem 0.5rem;
      background: #f3f4f6;
      min-height: 100vh;
    }
    .admin-profile-card {
      background: #ffffff;
      border-radius: 0.75rem;
      padding: 0.9rem 1.1rem;
      max-width: 320px;
      width: 100%;
      box-shadow: 0 6px 18px rgba(148,163,184,0.35);
      border: 1px solid #e5e7eb;
      font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
    }
    .admin-profile-header {
      display: flex;
      align-items: center;
      gap: 0.9rem;
      margin-bottom: 0.6rem;
    }
    .admin-profile-avatar {
      width: 48px;
      height: 48px;
      border-radius: 999px;
      background: #e5e7eb;
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: 600;
      color: #374151;
      font-size: 1.1rem;
    }
    .admin-profile-header h2 {
      margin: 0;
      font-size: 1.1rem;
      color: #111827;
    }
    .muted {
      font-size: 0.9rem;
      color: #6b7280;
      margin-top: 0.1rem;
    }
    .admin-profile-body {
      border-top: 1px solid #e5e7eb;
      border-bottom: 1px solid #e5e7eb;
      padding: 0.5rem 0;
      margin-bottom: 0.6rem;
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
    }
    .row {
      display: flex;
      justify-content: space-between;
      font-size: 0.9rem;
    }
    .label {
      color: #6b7280;
    }
    .value {
      color: #111827;
      font-weight: 500;
    }
    .back-btn {
      margin-top: 0.5rem;
      padding: 0.4rem 0.9rem;
      border-radius: 999px;
      border: 1px solid #d1d5db;
      background: #f9fafb;
      color: #111827;
      font-size: 0.9rem;
      cursor: pointer;
      transition: background 0.15s ease, border-color 0.15s ease,
                  box-shadow 0.15s ease, transform 0.1s ease;
    }
    .back-btn:hover {
      background: #eef2ff;
      border-color: #a5b4fc;
      box-shadow: 0 6px 16px rgba(148,163,184,0.4);
      transform: translateY(-1px);
    }
        .actions {
      display: flex;
      justify-content: space-between;
      gap: 0.5rem;
      margin-top: 0.5rem;
    }

    .logout-btn {
      margin-top: 0.5rem;
      padding: 0.4rem 0.9rem;
      border-radius: 999px;
      border: 1px solid #fecaca;
      background: #fef2f2;
      color: #b91c1c;
      font-size: 0.9rem;
      cursor: pointer;
      transition: background 0.15s ease, border-color 0.15s ease,
                  box-shadow 0.15s ease, transform 0.1s ease;
    }

    .logout-btn:hover {
      background: #fee2e2;
      border-color: #fca5a5;
      box-shadow: 0 6px 16px rgba(248,113,113,0.35);
      transform: translateY(-1px);
    }

  `]
})
export class AdminProfileComponent {
  constructor(private readonly auth: AuthService) {}

  onLogout(): void {
    this.auth.logout(); // this already navigates to /login
  }
}
