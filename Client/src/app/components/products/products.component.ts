import { Component, ViewChild } from '@angular/core';
import { MatSort, Sort } from '@angular/material/sort';
import { AddProductModalComponent } from '../modals/add-product-modal/add-product-modal.component';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';

export interface Products {
  name: string;
  category: string;
  price: number;
  id: string;
}

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent {
  displayedColumns = ['id', 'name', 'category', 'price', 'actions'];
  dataSource: MatTableDataSource<Products>;
  products: Products[] = [
    {
      name: 'Dark Chocolate IceCream Cake',
      category: 'IceCream Cake',
      price: 135,
      id: '202301',
    },
    {
      name: 'Coffee IceCream Cake',
      category: 'IceCream Cake',
      price: 135,
      id: '202302',
    },
    {
      name: 'Ube Keso IceCream Cake',
      category: 'IceCream Cake',
      price: 135,
      id: '202303',
    },
    {
      name: 'Strawberry Choco Cone Bites',
      category: 'Cone Bites',
      price: 135,
      id: '202304',
    },
    {
      name: 'Red Velvet Cone Bites',
      category: 'Cone Bites',
      price: 135,
      id: '202305',
    }
  ];

  sortedData: Products[];

  @ViewChild(MatSort) sort: MatSort;

  constructor(public dialog: MatDialog) {
    this.dataSource = new MatTableDataSource([{
      id: '202301',
      name: 'Dark Chocolate IceCream Cake',
      category: 'IceCream Cake',
      price: 1335.00,
    },
    {
      id: '202302',
      name: 'Coffee IceCream Cake',
      category: 'IceCream Cake',
      price: 135.00,
    },
    {
      id: '202303',
      name: 'Ube Keso IceCream Cake',
      category: 'IceCream Cake',
      price: 135.00,
    },
    {
      id: '202304',
      name: 'Strawberry Choco Cone Bites',
      category: 'Cone Bites',
      price: 135.00,
    },
    {
      id: '202305',
      name: 'Red Velvet Cone Bites',
      category: 'Cone Bites',
      price: 135.00,
    }]);

    this.sortedData = this.dataSource.data.slice();
  }

  addNewProduct(): void {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '450px';

    this.dialog.open(AddProductModalComponent, dialogConfig);
  }

  openProductFormDialog(): void {
    this.dialog.open(AddProductModalComponent, {
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

  sortData(sort: Sort) {
    const data = this.dataSource.data.slice();
    if (!sort.active || sort.direction === '') {
      this.sortedData = data;
      return;
    }

    this.sortedData = data.sort((a, b) => {
      const isAsc = sort.direction === "asc";
      switch (sort.active) {
        case "id":
          return compare(a.id, b.id, isAsc);
        case "name":
          return compare(a.name, b.name, isAsc);
        case "category":
          return compare(a.category, b.category, isAsc);
        case "price":
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
