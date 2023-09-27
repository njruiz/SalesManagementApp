import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularMaterialModule } from './angular-material.module';
import { ComponentsModule } from './components/components.module';
import { AdminLayoutComponent } from './layout/admin-layout/admin-layout.component';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app.routing';
import { HomepageComponent } from './home/homepage/homepage.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [AppComponent, AdminLayoutComponent, HomepageComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule,
    HttpClientModule,
    BrowserAnimationsModule,
    AngularMaterialModule,
    ComponentsModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
