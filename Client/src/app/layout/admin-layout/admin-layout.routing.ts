import { Routes } from '@angular/router';
import { ProductsComponent } from 'src/app/components/products/products.component';
import { DashboardComponent } from 'src/app/components/dashboard/dashboard.component';
import { OrdersComponent } from 'src/app/components/orders/orders.component';

export const AdminLayoutRoutes: Routes = [
  { path: 'dashboard', component: DashboardComponent },
  { path: 'orders', component: OrdersComponent },
  { path: 'products', component: ProductsComponent },
];
