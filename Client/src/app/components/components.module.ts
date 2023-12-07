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
import { AddOrderModalComponent } from './modals/add-order-modal/add-order-modal.component';
import { ProductCardComponent } from './products/product-card/product-card.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from '../_modules/shared.module';
import { ConfirmDialogComponent } from './modals/confirm-dialog/confirm-dialog.component';

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
    AddOrderModalComponent,
    ProductCardComponent,
    ConfirmDialogComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    AngularMaterialModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    SharedModule
  ],
  exports: [SidebarComponent],
})
export class ComponentsModule {}
