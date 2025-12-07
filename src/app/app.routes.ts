import { Routes } from '@angular/router';
import { VehicleListComponent } from './vehicles/vehicle-list.component';
import { VehicleDetailComponent } from './vehicles/vehicle-detail.component';
import { VehicleEditorComponent } from './vehicles/vehicle-editor.component';
import { LoginComponent } from './auth/login.component';
import { RegisterComponent } from './auth/register.component';
import { ProfileComponent } from './auth/profile.component';
import { AdminDashboardComponent } from './admin/admin-dashboard.component';

export const routes: Routes = [
  { path: '', component: VehicleListComponent },
  { path: 'vehicle/:slug', component: VehicleDetailComponent },
  { path: 'editor/new', component: VehicleEditorComponent },
  { path: 'editor/:id', component: VehicleEditorComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'admin', component: AdminDashboardComponent },
];
