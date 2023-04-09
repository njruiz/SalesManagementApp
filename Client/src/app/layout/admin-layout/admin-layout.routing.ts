import { Routes } from '@angular/router';
import { ProductsComponent } from 'src/app/components/products/products.component';
import { DashboardComponent } from 'src/app/components/dashboard/dashboard.component';
import { OrdersComponent } from 'src/app/components/orders/orders.component';
import { InventoryComponent } from 'src/app/components/inventory/inventory.component';
import { ReportsComponent } from 'src/app/components/reports/reports.component';
import { SettingsComponent } from 'src/app/components/settings/settings.component';

export const AdminLayoutRoutes: Routes = [
  { path: 'dashboard', component: DashboardComponent },
  { path: 'orders', component: OrdersComponent },
  { path: 'products', component: ProductsComponent },
  { path: 'inventory', component: InventoryComponent },
  { path: 'reports', component: ReportsComponent },
  { path: 'settings', component: SettingsComponent },
];
