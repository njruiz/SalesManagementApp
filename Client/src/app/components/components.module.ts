import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from './sidebar/sidebar.component';
import { RouterModule } from '@angular/router';
import { ProductsComponent } from './products/products.component';

@NgModule({
  declarations: [SidebarComponent, ProductsComponent],
  imports: [CommonModule, RouterModule],
  exports: [SidebarComponent],
})
export class ComponentsModule {}
