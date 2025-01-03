import { Routes } from '@angular/router';
import { DashboardComponent } from './features/views/dashboard/dashboard.component';
import { DynamicFormComponent } from './features/components/dynamic-form/dynamic-form.component';

export const routes: Routes = [
  { path: '', component: DashboardComponent, pathMatch: 'full' },
  { path: 'forms/:id', component: DynamicFormComponent },
  { path: 'forms', component: DynamicFormComponent },
  { path: '**', redirectTo: '', pathMatch: 'full' },
];
