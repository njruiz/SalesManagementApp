import { Component } from '@angular/core';
import { Sort } from '@angular/material/sort';

export interface Products {
  name: string;
  category: string;
  status: string;
  stocks: number;
  price: number;
  id: string;
}

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent {
  products: Products[] = [
    {
      name: 'Dark Chocolate IceCream Cake',
      category: 'IceCream Cake',
      status: 'Available',
      stocks: 31,
      price: 135,
      id: '202301',
    },
    {
      name: 'Coffee IceCream Cake',
      category: 'IceCream Cake',
      status: 'Low Stocks',
      stocks: 5,
      price: 135,
      id: '202302',
    },
    {
      name: 'Ube Keso IceCream Cake',
      category: 'IceCream Cake',
      status: 'Sold Out',
      stocks: 0,
      price: 135,
      id: '202303',
    },
    {
      name: 'Strawberry Choco Cone Bites',
      category: 'Cone Bites',
      status: 'Available',
      stocks: 123,
      price: 135,
      id: '202304',
    },
    {
      name: 'Red Velvet Cone Bites',
      category: 'Cone Bites',
      status: 'Available',
      stocks: 15,
      price: 135,
      id: '202305',
    },
    {
      name: 'Cheesecake Cone Bites',
      category: 'Cone Bites',
      status: 'Sold Out',
      stocks: 0,
      price: 135,
      id: '202306',
    },
    {
      name: 'Milky Almonds Cone Bites',
      category: 'Cone Bites',
      status: 'Available',
      stocks: 15,
      price: 135,
      id: '202307',
    },
  ];

  sortedData: Products[];

  constructor() {
    this.sortedData = this.products.slice();
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
    const data = this.products.slice();
    if (!sort.active || sort.direction === '') {
      this.sortedData = data;
      return;
    }

    this.sortedData = data.sort((a, b) => {
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
        case 'id':
          return compare(a.id, b.id, isAsc);
        default:
          return 0;
      }
    });
  }
}

function compare(a: number | string, b: number | string, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
