import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from 'src/app/dashboard/dashboard.component';
import { TransactionsComponent } from 'src/app/transactions/transactions.component';
import { RouterModule } from '@angular/router';
import { AdminLayoutRoutes } from './admin-layout.routing';

@NgModule({
  declarations: [DashboardComponent, TransactionsComponent],
  imports: [CommonModule, RouterModule.forChild(AdminLayoutRoutes)],
})
export class AdminLayoutModule {}
