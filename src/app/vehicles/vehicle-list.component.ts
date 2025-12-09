import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { VehicleService } from '../services/vehicle.service';
import { Vehicle } from '../models/vehicle.model';

type CategoryFilter = 'ALL' | 'BIKES' | 'CARS';

@Component({
  selector: 'app-vehicle-list',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  template: `
    <main
      [ngStyle]="isDark
        ? { 'background-color': '#020617', color: '#e5e7eb' }
        : { 'background-color': '#f3f4f6', color: '#0f172a' }"
      style="min-height: 100vh; margin: 0;"
    >
      <section class="max-w-6xl" style="margin:0 auto; padding:2rem 1.5rem;">
        <!-- Header with dropdown + theme toggle + profile -->
        <header
          style="
            display:flex;
            flex-wrap:wrap;
            align-items:center;
            justify-content:space-between;
            gap:1rem;
            margin-bottom:1.5rem;
          "
        >
          <div>
            <h1
              style="
                font-size:1.75rem;
                font-weight:700;
                margin:0;
              "
            >
              SuperBikes & Supercars
            </h1>
            <p
              [ngStyle]="{
                'font-size': '0.875rem',
                color: isDark ? '#9ca3af' : '#6b7280',
                marginTop: '0.25rem'
              }"
            >
              Explore legendary bikes and performance cars with specs.
            </p>
          </div>

          <div
            style="
              display:flex;
              align-items:center;
              gap:0.75rem;
            "
          >
            <!-- Category dropdown -->
            <select
              [(ngModel)]="category"
              (change)="applyFilter()"
              style="
                border-radius:999px;
                padding:0.35rem 0.75rem;
                font-size:0.85rem;
                border:1px solid #d1d5db;
                background-color:#ffffff;
                color:#111827;
                outline:none;
              "
            >
              <option value="ALL">All vehicles</option>
              <option value="BIKES">Only bikes</option>
              <option value="CARS">Only cars</option>
            </select>

            <!-- Theme toggle -->
            <button
              type="button"
              (click)="toggleTheme()"
              [ngStyle]="{
                borderRadius: '999px',
                padding: '0.35rem 0.9rem',
                fontSize: '0.85rem',
                border: '1px solid #d1d5db',
                backgroundColor: isDark ? '#020617' : '#ffffff',
                color: isDark ? '#e5e7eb' : '#111827',
                cursor: 'pointer'
              }"
            >
              {{ isDark ? 'Light mode' : 'Dark mode' }}
            </button>

            <!-- Profile icon button -->
            <a
              routerLink="/profile"
              style="
                display:inline-flex;
                align-items:center;
                gap:0.4rem;
                padding:0.3rem 0.8rem;
                border-radius:999px;
                background-color:#e0f2fe;
                color:#0f172a;
                font-size:0.8rem;
                text-decoration:none;
                border:1px solid #bfdbfe;
              "
            >
              <span
                style="
                  width:28px;
                  height:28px;
                  border-radius:999px;
                  background:linear-gradient(135deg,#0ea5e9,#22c55e);
                  display:flex;
                  align-items:center;
                  justify-content:center;
                  color:#ffffff;
                  font-size:0.85rem;
                  font-weight:600;
                "
              >
                U
              </span>
              <span>Profile</span>
            </a>
          </div>
        </header>

                <!-- Card grid -->
        <div class="vehicle-grid">
          <article
            class="vehicle-card"
            *ngFor="let vehicle of filtered"
            [ngStyle]="{
              border: '1px solid ' + (isDark ? '#1f2937' : '#e5e7eb'),
              backgroundColor: isDark ? '#020617' : '#ffffff'
            }"
          >
            <img
              class="vehicle-card-image"
              *ngIf="vehicle.imageUrl"
              [src]="vehicle.imageUrl"
              [alt]="vehicle.title"
            />

            <div class="vehicle-card-body">
              <h2
                class="vehicle-card-title"
                [ngStyle]="{
                  color: isDark ? '#e5e7eb' : '#0f172a'
                }"
              >
                {{ vehicle.title }}
              </h2>

              <p
                class="vehicle-card-excerpt"
                [ngStyle]="{
                  color: isDark ? '#d1d5db' : '#4b5563'
                }"
              >
                {{ vehicle.excerpt }}
              </p>

              <p
                class="vehicle-card-meta"
                [ngStyle]="{
                  color: isDark ? '#9ca3af' : '#6b7280'
                }"
              >
                Status:
                <span
                  [ngStyle]="{
                    backgroundColor: vehicle.status === 'AVAILABLE'
                      ? '#22c55e33'
                      : vehicle.status === 'SOLD'
                        ? '#fee2e2'
                        : '#fef9c3',
                    color: vehicle.status === 'AVAILABLE'
                      ? '#15803d'
                      : vehicle.status === 'SOLD'
                        ? '#b91c1c'
                        : '#92400e'
                  }"
                  class="status-pill"
                >
                  {{ vehicle.status }}
                </span>
                · Added on {{ vehicle.createdAt | date: 'mediumDate' }}
              </p>
            </div>
          </article>
        </div>

      </section>
    </main>
  `,
})
export class VehicleListComponent {
  vehicles: Vehicle[] = [];
  filtered: Vehicle[] = [];
  category: CategoryFilter = 'ALL';
  isDark = false;

  constructor(private readonly vehicleService: VehicleService) {
    this.vehicles = this.vehicleService.getAll();
    this.applyFilter();
  }

  ngOnInit(): void {
    this.applyFilter();
  }

  applyFilter(): void {
    this.vehicles = this.vehicleService.getAll();


    const isBike = (v: Vehicle) =>
      ['Hyperbike', 'Superbike', 'Naked', 'Sports Tourer', 'Tourer'].includes(
        v.tags[0]?.name
      );

    if (this.category === 'ALL') {
      this.filtered = this.vehicles;
    } else if (this.category === 'BIKES') {
      this.filtered = this.vehicles.filter(isBike);
    } else {
      this.filtered = this.vehicles.filter((v) => !isBike(v));
    }
  }

  toggleTheme(): void {
    this.isDark = !this.isDark;
  }
}
