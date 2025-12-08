import { Routes } from '@angular/router';
import { VehicleListComponent } from './vehicles/vehicle-list.component';
import { VehicleDetailComponent } from './vehicles/vehicle-detail.component';
import { VehicleEditorComponent } from './vehicles/vehicle-editor.component';
import { LoginComponent } from './auth/login.component';
import { RegisterComponent } from './auth/register.component';
import { ProfileComponent } from './auth/profile.component';
import { AdminDashboardComponent } from './admin/admin-dashboard.component';
import { AdminGuard } from './admin/admin.guard';

export const routes: Routes = [
  // default route → login
  { path: '', redirectTo: 'login', pathMatch: 'full' },

  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'profile', component: ProfileComponent },

  { path: 'vehicles', component: VehicleListComponent },
  { path: 'vehicle/:slug', component: VehicleDetailComponent },
  { path: 'editor/new', component: VehicleEditorComponent },
  { path: 'editor/:id', component: VehicleEditorComponent },

  // admin protected by role
  {
    path: 'admin',
    component: AdminDashboardComponent,
    canActivate: [AdminGuard],
  },

  // wildcard
  { path: '**', redirectTo: 'login' },
];
