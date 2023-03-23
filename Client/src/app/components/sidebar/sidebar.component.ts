import { Component, OnInit } from '@angular/core';

declare const $: any;
declare interface RouteInfo {
  path: string;
  title: string;
  icon: string;
  class: string;
}

export const ROUTES: RouteInfo[] = [
  { path: '/dashboard', title: 'Dashboard', icon: 'dashboard', class: '' },
  { path: '/orders', title: 'Orders', icon: 'receipt_long', class: '' },
  { path: '/products', title: 'Products', icon: 'shopping_bag', class: '' },
  { path: '/inventory', title: 'Inventory', icon: 'inventory_2', class: '' },
  { path: '/reports', title: 'Reports', icon: 'analytics', class: '' },
  { path: '/settings', title: 'Settings', icon: 'settings', class: '' },
];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent implements OnInit {
  menuItems: any[];

  constructor() {}

  ngOnInit(): void {
    this.menuItems = ROUTES.filter((menuItem) => menuItem);
  }

  isMobileMenu() {
    if ($(window).width() > 991) {
      return false;
    }
    return true;
  }
}
