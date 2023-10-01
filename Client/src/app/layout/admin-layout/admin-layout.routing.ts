import { Routes } from '@angular/router';
import { ProductsComponent } from 'src/app/components/products/products.component';
import { DashboardComponent } from 'src/app/components/dashboard/dashboard.component';
import { OrdersComponent } from 'src/app/components/orders/orders.component';
import { InventoryComponent } from 'src/app/components/inventory/inventory.component';
import { ReportsComponent } from 'src/app/components/reports/reports.component';
import { SettingsComponent } from 'src/app/components/settings/settings.component';
import { TestErrorComponent } from 'src/app/errors/test-error/test-error.component';
import { NotFoundComponent } from 'src/app/errors/not-found/not-found.component';
import { ServerErrorComponent } from 'src/app/errors/server-error/server-error.component';

export const AdminLayoutRoutes: Routes = [
  { path: 'dashboard', component: DashboardComponent },
  { path: 'orders', component: OrdersComponent },
  { path: 'products', component: ProductsComponent },
  { path: 'inventory', component: InventoryComponent },
  { path: 'reports', component: ReportsComponent },
  { path: 'settings', component: SettingsComponent },
  { path: 'errors', component: TestErrorComponent },
  { path: 'not-found', component: NotFoundComponent },
  { path: 'server-error', component: ServerErrorComponent },
  { path: '**', component: NotFoundComponent, pathMatch: 'full' },
];
