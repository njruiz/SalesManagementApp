import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { InventoryItem } from 'src/app/_models/inventoryItem';
import { AddInventoryProductModalComponent } from '../modals/add-inventory-product-modal/add-inventory-product-modal.component';
import { AddInventoryResourceModalComponent } from '../modals/add-inventory-resource-modal/add-inventory-resource-modal.component';

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.css'],
})
export class InventoryComponent {
  displayedProductColumns = [
    'productName',
    'size',
    'status',
    'stocks',
    'actions',
  ];
  displayedResourceColumns = [
    'name',
    'brand',
    'size',
    'status',
    'quantity',
    'price',
    'actions',
  ];

  dataSource_Product: MatTableDataSource<InventoryItem>;
  dataSource_Resource: MatTableDataSource<InventoryItem>;

  sortedProductData: InventoryItem[];
  sortedResourceData: InventoryItem[];

  constructor(public dialog: MatDialog) {
    this.dataSource_Product = new MatTableDataSource([
      {
        productName: 'Dark Chocolate',
        category: 'Ice Cream Cake',
        size: 'Regular',
        status: 'Available',
        stocks: 31,
        price: 135,
        productCode: '202301',
        flavor: 'Choco',
        description: 'Test',
      },
      {
        productName: 'Coffee',
        category: 'Ice Cream Cake',
        size: 'Regular',
        status: 'Low Stocks',
        stocks: 5,
        price: 135,
        productCode: '202302',
        flavor: 'Choco',
        description: 'Test',
      },
      {
        productName: 'Ube Keso',
        category: 'Ice Cream Cake',
        size: 'Large',
        status: 'Sold Out',
        stocks: 0,
        price: 325,
        productCode: '202303',
        flavor: 'Choco',
        description: 'Test',
      },
      {
        productName: 'Strawberry Choco',
        category: 'Cone Bites',
        size: 'Regular',
        status: 'Available',
        stocks: 123,
        price: 135,
        productCode: '202304',
        flavor: 'Choco',
        description: 'Test',
      },
      {
        productName: 'Red Velvet',
        category: 'Cone Bites',
        size: 'Regular',
        status: 'Available',
        stocks: 15,
        price: 135,
        productCode: '202305',
        flavor: 'Choco',
        description: 'Test',
      },
    ]);

    this.dataSource_Resource = new MatTableDataSource([
      {
        productName: 'Tin Can',
        brand: "Ava's Baking Supplies",
        status: 'Available',
        size: 'Large',
        quantity: 120,
        price: 54,
        productCode: 'R-20230601',
        flavor: 'Choco',
        description: 'Test',
      },
      {
        productName: 'Tin Can',
        brand: 'Shopee',
        status: 'Available',
        size: 'Regular',
        quantity: 95,
        price: 45,
        productCode: 'R-20230602',
        flavor: 'Choco',
        description: 'Test',
      },
      {
        productName: 'Condensed Milk',
        brand: "Angel's",
        status: 'Available',
        size: '325 mL',
        quantity: 12,
        price: 45,
        productCode: 'R-20230603',
        flavor: 'Choco',
        description: 'Test',
      },
      {
        productName: 'All Pupose Cream',
        brand: 'Nestle',
        status: 'Available',
        size: '1 L',
        quantity: 4,
        price: 298,
        productCode: 'R-20230604',
        flavor: 'Choco',
        description: 'Test',
      },
      {
        productName: 'Chocolate Bar',
        brand: 'Goya',
        status: 'Available',
        size: '1 Kg',
        quantity: 9,
        price: 275,
        productCode: 'R-20230605',
        flavor: 'Choco',
        description: 'Test',
      },
    ]);

    this.sortedProductData = this.dataSource_Product.data.slice();
    this.sortedResourceData = this.dataSource_Resource.data.slice();
  }

  openAddProductFormDialog(): void {
    this.dialog.open(AddInventoryProductModalComponent, {
      width: '400px',
    });
  }

  openAddResourceFormDialog(): void {
    this.dialog.open(AddInventoryResourceModalComponent, {
      width: '400px',
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
        case 'productName':
          return compare(a.productName, b.productName, isAsc);
        case 'size':
          return compare(a.size, b.size, isAsc);
        case 'status':
          return compare(a.status, b.status, isAsc);
        case 'stocks':
          return compare(a.stocks, b.stocks, isAsc);
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
          return compare(a.productName, b.productName, isAsc);
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
