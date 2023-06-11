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
import { AddProductModalComponent } from './modals/add-product-modal/add-product-modal.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddInventoryProductModalComponent } from './modals/add-inventory-product-modal/add-inventory-product-modal.component';
import { AddInventoryResourceModalComponent } from './modals/add-inventory-resource-modal/add-inventory-resource-modal.component';

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
    AddProductModalComponent,
    AddInventoryProductModalComponent,
    AddInventoryResourceModalComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    AngularMaterialModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports: [SidebarComponent],
})
export class ComponentsModule {}
