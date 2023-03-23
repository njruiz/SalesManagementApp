import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from 'src/app/components/dashboard/dashboard.component';
import { OrdersComponent } from 'src/app/components/orders/orders.component';
import { RouterModule } from '@angular/router';
import { AdminLayoutRoutes } from './admin-layout.routing';

@NgModule({
  declarations: [DashboardComponent, OrdersComponent],
  imports: [CommonModule, RouterModule.forChild(AdminLayoutRoutes)],
})
export class AdminLayoutModule {}
