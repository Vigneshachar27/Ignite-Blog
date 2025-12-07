import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { VehicleService } from '../services/vehicle.service';
import { Vehicle } from '../models/vehicle.model';

type CategoryFilter = 'ALL' | 'BIKES' | 'CARS';

@Component({
    selector: 'app-vehicle-list',
    standalone: true,
    imports: [CommonModule, FormsModule],
    template: `
    <main
      [ngStyle]="isDark
        ? { 'background-color': '#020617', color: '#e5e7eb' }
        : { 'background-color': '#f3f4f6', color: '#0f172a' }"
      style="min-height: 100vh; margin: 0;"
    >
      <section class="max-w-6xl" style="margin:0 auto; padding:2rem 1.5rem;">
        <!-- Header with dropdown + theme toggle -->
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
          </div>
        </header>

        <!-- Card grid (no images) -->
        <div
          style="
            display:grid;
            gap:1.5rem;
            grid-template-columns:repeat(auto-fit,minmax(260px,1fr));
          "
        >
        <article
        *ngFor="let vehicle of filtered"
        [ngStyle]="{
            border: '1px solid ' + (isDark ? '#1f2937' : '#e5e7eb'),
            borderRadius: '0.75rem',
            backgroundColor: isDark ? '#020617' : '#ffffff',
            padding: '1rem 1.25rem',
            boxShadow: '0 1px 2px rgba(15,23,42,0.4)'
        }"
        >
        <!-- Row: image area + text area -->
        <div
            style="
            display:flex;
            align-items:flex-start;
            gap:1rem;
            "
        >
            <!-- Left: image placeholder (fixed size) -->
            <div
            style="
                flex:0 0 90px;
                height:90px;
                border-radius:0.75rem;
                background-color:#e5e7eb;
                overflow:hidden;
            "
            >
            <img
                *ngIf="vehicle.imageUrl"
                [src]="vehicle.imageUrl"
                [alt]="vehicle.title"
                style="width:100%; height:100%; object-fit:cover;"
            />
            <!-- if no imageUrl, grey box will stay as placeholder -->
            </div>

            <!-- Right: text content -->
            <div style="flex:1 1 auto;">
            <h2
                [ngStyle]="{
                fontSize: '1.05rem',
                fontWeight: 600,
                color: isDark ? '#e5e7eb' : '#0f172a',
                margin: '0 0 0.25rem 0'
                }"
            >
                {{ vehicle.title }}
            </h2>

            <p
                [ngStyle]="{
                fontSize: '0.9rem',
                color: isDark ? '#d1d5db' : '#4b5563',
                margin: '0 0 0.5rem 0'
                }"
            >
                {{ vehicle.excerpt }}
            </p>

            <p
                [ngStyle]="{
                fontSize: '0.75rem',
                color: isDark ? '#9ca3af' : '#6b7280',
                margin: '0 0 0.25rem 0'
                }"
            >
                Status:
                <span
                [ngStyle]="vehicle.status === 'PUBLISHED'
                    ? {
                        'background-color': '#22c55e33',
                        color: '#22c55e',
                        display: 'inline-flex',
                        alignItems: 'center',
                        borderRadius: '999px',
                        padding: '0.1rem 0.45rem',
                        fontWeight: 500
                    }
                    : {
                        'background-color': '#e5e7eb',
                        color: '#374151',
                        display: 'inline-flex',
                        alignItems: 'center',
                        borderRadius: '999px',
                        padding: '0.1rem 0.45rem',
                        fontWeight: 500
                    }"
                >
                {{ vehicle.status }}
                </span>
            </p>

            <p
                [ngStyle]="{
                fontSize: '0.7rem',
                color: isDark ? '#6b7280' : '#9ca3af',
                margin: 0
                }"
            >
                Added on {{ vehicle.createdAt | date: 'mediumDate' }}
            </p>
            </div>
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
        this.vehicles = this.vehicleService.getAll(); // loads all items from service [web:80]
        this.applyFilter();
    }

    applyFilter(): void {
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
