import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { InventoryItem } from 'src/app/_models/inventoryItem';
import { AddInventoryProductModalComponent } from '../modals/add-inventory-product-modal/add-inventory-product-modal.component';

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.css'],
})
export class InventoryComponent {
  displayedProductColumns = ['name', 'category', 'size', 'status', 'stocks', 'price', 'actions'];
  displayedResourceColumns = ['name', 'brand', 'size', 'status', 'quantity', 'price', 'actions'];

  dataSource_Product: MatTableDataSource<InventoryItem>;  
  dataSource_Resource: MatTableDataSource<InventoryItem>;  

  sortedProductData: InventoryItem[];
  sortedResourceData: InventoryItem[];

  constructor(public dialog: MatDialog) {
    this.dataSource_Product = new MatTableDataSource([
      {
        name: 'Dark Chocolate',
        category: 'Ice Cream Cake',
        size: 'Regular',
        status: 'Available',
        stocks: 31,
        price: 135,
        id: '202301',
      },
      {
        name: 'Coffee',
        category: 'Ice Cream Cake',
        size: 'Regular',
        status: 'Low Stocks',
        stocks: 5,
        price: 135,
        id: '202302',
      },
      {
        name: 'Ube Keso',
        category: 'Ice Cream Cake',
        size: 'Large',
        status: 'Sold Out',
        stocks: 0,
        price: 325,
        id: '202303',
      },
      {
        name: 'Strawberry Choco',
        category: 'Cone Bites',
        size: 'Regular',
        status: 'Available',
        stocks: 123,
        price: 135,
        id: '202304',
      },
      {
        name: 'Red Velvet',
        category: 'Cone Bites',
        size: 'Regular',
        status: 'Available',
        stocks: 15,
        price: 135,
        id: '202305',
      }
    ]);

    this.dataSource_Resource = new MatTableDataSource([
      {
        name: 'Tin Can',
        brand: 'Ava\'s Baking Supplies',
        status: 'Available',
        size: 'Large',
        quantity: 120,
        price: 54,
        id: 'R-20230601',
      },
      {
        name: 'Tin Can',
        brand: 'Shopee',
        status: 'Available',
        size: 'Regular',
        quantity: 95,
        price: 45,
        id: 'R-20230602',
      },
      {
        name: 'Condensed Milk',
        brand: 'Angel\'s',
        status: 'Available',
        size: '325 mL',
        quantity: 12,
        price: 45,
        id: 'R-20230603',
      },
      {
        name: 'All Pupose Cream',
        brand: 'Nestle',
        status: 'Available',
        size: '1 L',
        quantity: 4,
        price: 298,
        id: 'R-20230604',
      },
      {
        name: 'Chocolate Bar',
        brand: 'Goya',
        status: 'Available',
        size: '1 Kg',
        quantity: 9,
        price: 275,
        id: 'R-20230605',
      }
    ]);  

    this.sortedProductData = this.dataSource_Product.data.slice();
    this.sortedResourceData = this.dataSource_Resource.data.slice();
  }

  openAddProductFormDialog(): void {
    this.dialog.open(AddInventoryProductModalComponent, {
      width: '400px'
    });
  }

  setStatusFontColor(status: string) {
    switch (status) {
      case 'Available':
        return 'RGB(8, 148, 4)';
      case 'Low Stocks':
        return 'RGB(255, 191, 0)';
      case 'Sold Out':
        return 'red';
    }
  }

  sortProducts(sort: Sort) {
    const data = this.dataSource_Product.data.slice();
    if (!sort.active || sort.direction === '') {
      this.sortedProductData = data;
      return;
    }

    this.sortedProductData = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'name':
          return compare(a.name, b.name, isAsc);
        case 'category':
          return compare(a.category, b.category, isAsc);
        case 'status':
          return compare(a.status, b.status, isAsc);
        case 'stocks':
          return compare(a.stocks, b.stocks, isAsc);
        case 'price':
          return compare(a.price, b.price, isAsc);
        default:
          return 0;
      }
    });
  }

  sortResources(sort: Sort) {
    const data = this.dataSource_Resource.data.slice();
    if (!sort.active || sort.direction === '') {
      this.sortedResourceData = data;
      return;
    }

    this.sortedResourceData = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'name':
          return compare(a.name, b.name, isAsc);
        case 'status':
          return compare(a.status, b.status, isAsc);
        case 'quantity':
          return compare(a.quantity, b.quantity, isAsc);
        case 'price':
          return compare(a.price, b.price, isAsc);
        default:
          return 0;
      }
    });
  }
}

function compare(a: number | string, b: number | string, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
