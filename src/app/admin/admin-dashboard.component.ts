import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { VehicleService } from '../services/vehicle.service';
import { Vehicle } from '../models/vehicle.model';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  template: `
    <main style="min-height:100vh; background:#f5f9ff; padding:2rem 1.5rem;">
      <section style="max-width:1100px; margin:0 auto;">
        <header style="display:flex; justify-content:space-between; align-items:center; margin-bottom:1.5rem;">
          <div>
            <h1 style="font-size:1.75rem; font-weight:700; margin:0; color:#1d4ed8;">
              Admin dashboard
            </h1>
            <p style="font-size:0.9rem; color:#64748b; margin:0.25rem 0 0 0;">
              Manage bikes & supercars (create, edit, delete).
            </p>
          </div>
          <button type="button"class="admin-profile-btn"[routerLink]="['/admin/profile']">
          <span class="admin-avatar"></span>
          <span>Profile</span>
          </button>
          <button
            type="button"
            (click)="startCreate()"
            style="padding:0.45rem 0.9rem; border-radius:999px; border:none;
                   background:linear-gradient(90deg,#22c55e,#0ea5e9); color:#ffffff;
                   font-size:0.85rem; font-weight:600; cursor:pointer;"
          >
            + New vehicle
          </button>
        </header>

        <!-- Create / edit form -->
        <section
          *ngIf="editing"
          style="margin-bottom:1.5rem; padding:1rem 1.25rem; border-radius:0.75rem;
                 background:#ffffff; box-shadow:0 1px 3px rgba(15,23,42,0.12);
                 border:1px solid #e5e7eb;"
        >
          <h2 style="font-size:1rem; font-weight:600; margin:0 0 0.75rem 0; color:#1f2933;">
            {{ exists(editVehicle.id) ? 'Edit vehicle' : 'Create vehicle' }}
          </h2>

          <form (ngSubmit)="save()" class="vehicle-form">
  <div class="form-row">
    <div class="form-field">
      <label>Title</label>
      <input
        [(ngModel)]="editVehicle.title"
        name="title"
        required
      />
    </div>
    <div class="form-field">
      <label>Slug</label>
      <input
        [(ngModel)]="editVehicle.slug"
        name="slug"
        required
      />
    </div>
  </div>

  <div class="form-field">
    <label>Excerpt</label>
    <textarea
      [(ngModel)]="editVehicle.excerpt"
      name="excerpt"
      rows="2"
    ></textarea>
  </div>

  <div class="form-field">
    <label>Image URL</label>
    <input
      [(ngModel)]="editVehicle.imageUrl"
      name="imageUrl"
      placeholder="Paste direct image link (jpg/png)"
    />
  </div>

  <div class="form-row">
    <div class="form-field small">
      <label>Status</label>
      <select
        [(ngModel)]="editVehicle.status"
        name="status"
      >
        <option value="AVAILABLE">AVAILABLE</option>
        <option value="SOLD">SOLD</option>
        <option value="ON_HOLD">ON_HOLD</option>
      </select>
    </div>

    <div class="form-actions">
      <button type="button" (click)="cancelEdit()">Cancel</button>
      <button type="submit">Save</button>
    </div>
  </div>
</form>

        </section>

        <!-- Vehicles table -->
        <table style="width:100%; border-collapse:collapse; background:#ffffff;
                      border-radius:0.75rem; overflow:hidden;
                      box-shadow:0 8px 20px rgba(15,23,42,0.08); border:1px solid #e5e7eb;">
          <thead style="background:#e0f2fe;">
            <tr>
              <th style="text-align:left; padding:0.6rem 0.75rem; font-size:0.8rem; color:#1f2933;">Title</th>
              <th style="text-align:left; padding:0.6rem 0.75rem; font-size:0.8rem; color:#1f2933;">Slug</th>
              <th style="text-align:left; padding:0.6rem 0.75rem; font-size:0.8rem; color:#1f2933;">Status</th>
              <th style="text-align:left; padding:0.6rem 0.75rem; font-size:0.8rem; color:#1f2933;">Created</th>
              <th style="text-align:right; padding:0.6rem 0.75rem; font-size:0.8rem; color:#1f2933;">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr *ngFor="let v of vehicles">
              <td style="padding:0.6rem 0.75rem; font-size:0.85rem; color:#111827;">{{ v.title }}</td>
              <td style="padding:0.6rem 0.75rem; font-size:0.8rem; color:#6b7280;">{{ v.slug }}</td>
              <td style="padding:0.6rem 0.75rem; font-size:0.8rem;">
                <span
                  [ngStyle]="{
                    backgroundColor: v.status === 'AVAILABLE'
                      ? '#22c55e33'
                      : v.status === 'SOLD'
                        ? '#fee2e2'
                        : '#fef9c3',
                    color: v.status === 'AVAILABLE'
                      ? '#15803d'
                      : v.status === 'SOLD'
                        ? '#b91c1c'
                        : '#92400e'
                  }"
                  style="padding:0.1rem 0.5rem; border-radius:999px; font-weight:500; font-size:0.75rem;"
                >
                  {{ v.status }}
                </span>
              </td>
              <td style="padding:0.6rem 0.75rem; font-size:0.8rem; color:#6b7280;">
                {{ v.createdAt | date:'mediumDate' }}
              </td>
              <td style="padding:0.6rem 0.75rem; text-align:right;">
                <button
                  type="button"
                  (click)="startEdit(v)"
                  style="margin-right:0.5rem; padding:0.3rem 0.6rem; border-radius:999px;
                         border:1px solid #dbeafe; background:#eff6ff; color:#1d4ed8;
                         font-size:0.75rem; cursor:pointer;"
                >
                  Edit
                </button>
                <button
                  type="button"
                  (click)="delete(v)"
                  style="padding:0.3rem 0.6rem; border-radius:999px;
                         border:1px solid #fee2e2; background:#fef2f2; color:#b91c1c;
                         font-size:0.75rem; cursor:pointer;"
                >
                  Delete
                </button>
              </td>
            </tr>
            <tr *ngIf="vehicles.length === 0">
              <td colspan="5" style="padding:0.9rem 0.75rem; font-size:0.85rem; color:#6b7280; text-align:center;">
                No vehicles available.
              </td>
            </tr>
          </tbody>
        </table>
      </section>
    </main>
  `,
})
export class AdminDashboardComponent {
  vehicles: Vehicle[] = [];
  editing = false;
  editVehicle!: Vehicle;

  constructor(private readonly vehicleService: VehicleService) {
    this.vehicles = this.vehicleService.getAll();
  }

  exists(id: number): boolean {
    return this.vehicles.some((v) => v.id === id);
  }

  startCreate(): void {
    const now = new Date().toISOString();
    const author = this.vehicles[0]?.author;
    this.editVehicle = {
      id: Date.now(),
      title: '',
      slug: '',
      excerpt: '',
      content: '',
      author,
      tags: [],
      status: 'AVAILABLE',
      createdAt: now,
      updatedAt: now,
      imageUrl: '',
    };
    this.editing = true;
  }

  startEdit(v: Vehicle): void {
    this.editVehicle = { ...v };
    this.editing = true;
  }

  cancelEdit(): void {
    this.editing = false;
  }

  save(): void {
    if (this.exists(this.editVehicle.id)) {
      this.vehicleService.update(this.editVehicle);
    } else {
      this.vehicleService.add(this.editVehicle);
    }
    this.vehicles = this.vehicleService.getAll();
    this.editing = false;
  }

  delete(v: Vehicle): void {
    this.vehicleService.delete(v.id);
    this.vehicles = this.vehicleService.getAll();
  }
}
