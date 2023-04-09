import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from './sidebar/sidebar.component';
import { RouterModule } from '@angular/router';
import { ProductsComponent } from './products/products.component';
import { AngularMaterialModule } from '../angular-material.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { OrdersComponent } from './orders/orders.component';
import { HeaderComponent } from './header/header.component';
import { InventoryComponent } from './inventory/inventory.component';
import { ReportsComponent } from './reports/reports.component';
import { SettingsComponent } from './settings/settings.component';

@NgModule({
  declarations: [
    DashboardComponent,
    OrdersComponent,
    ProductsComponent,
    SidebarComponent,
    HeaderComponent,
    InventoryComponent,
    ReportsComponent,
    SettingsComponent,
  ],
  imports: [CommonModule, RouterModule, AngularMaterialModule],
  exports: [SidebarComponent],
})
export class ComponentsModule {}
