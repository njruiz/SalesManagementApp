import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Order } from 'src/app/_models/order';
import { Product } from 'src/app/_models/product';
import { AddOrderModalComponent } from '../modals/add-order-modal/add-order-modal.component';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent {

  dateToday = new Date();
  displayedColumns = ['transaction_id', 'customer', 'date', 'number_of_items', 'total_amount', 'status', 'actions'];
  dataSource: MatTableDataSource<Order>;

  sortedData: Order[];

  products: Product[] = [
    // {
    //   productCode: '202301',
    //   productName: 'Dark Chocolate IceCream Cake',
    //   size: 'Regular',
    //   price: 135,
    //   flavor: 'Choco',
    //   description: 'Test'
    // },
    // {
    //   productCode: '202302',
    //   productName: 'Coffee IceCream Cake',
    //   size: 'Large',
    //   price: 325,
    //   flavor: 'Choco',
    //   description: 'Test'
    // },
    // {
    //   productCode: '202303',
    //   productName: 'Ube Keso IceCream Cake',
    //   size: 'Large',
    //   price: 325,
    //   flavor: 'Choco',
    //   description: 'Test'
    // },
    // {
    //   productCode: '202304',
    //   productName: 'Strawberry Choco Cone Bites',
    //   size: 'Regular',
    //   price: 120,
    //   flavor: 'Choco',
    //   description: 'Test'
    // },
    // {
    //   productCode: '202305',
    //   productName: 'Red Velvet Cone Bites',
    //   size: 'Regular',
    //   price: 120,
    //   flavor: 'Choco',
    //   description: 'Test'
    // }
  ];

  @ViewChild(MatSort) sort: MatSort;

  constructor(public dialog: MatDialog) {
    this.dataSource = new MatTableDataSource([{
      id: 1,
      transaction_id: '20230615001',
      customer: 'Luke Skywalker',
      products: this.products,
      number_of_items: 5,
      total_amount: 666,
      date: new Date('2023-06-12'),
      status: 'Completed',
    },
    {
      id: 2,
      transaction_id: '20230615002',
      customer: 'Darth Vader',
      products: this.products,
      number_of_items: 10,
      total_amount: 777,
      date: new Date('2023-06-15'),
      status: 'For Delivery',
    },
    {
      id: 3,
      transaction_id: '20230615003',
      customer: 'Obi-Wan Kenobi',
      products: this.products,
      number_of_items: 2,
      total_amount: 555,
      date: new Date('2023-06-18'),
      status: 'For Delivery',
    },
    {
      id: 4,
      transaction_id: '20230615004',
      customer: 'Leia Amidala',
      products: this.products,
      number_of_items: 1,
      total_amount: 333,
      date: new Date('2023-06-18'),
      status: 'Pending',
    },
    {
      id: 5,
      transaction_id: '20230615005',
      customer: 'Kylo Ren',
      products: this.products,
      number_of_items: 9,
      total_amount: 999,
      date: new Date('2023-06-19'),
      status: 'Completed',
    }]);

    this.sortedData = this.dataSource.data.slice();
  }

  openOrderFormDialog(): void {
    this.dialog.open(AddOrderModalComponent, {
      width: '85em',
      height: '45em'
    });
  }

  setStatusFontColor(status: string) {
    switch (status) {
      case 'Completed':
        return 'RGB(8, 148, 4)';
      case 'For Delivery':
        return 'RGB(255, 191, 0)';
      case 'Pending':
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
        case "transaction_id":
          return compare(a.transaction_id, b.transaction_id, isAsc);
        case "customer":
          return compare(a.customer, b.customer, isAsc);
        case "date":
          return compare(a.date, b.date, isAsc);
        case "number_of_items":
          return compare(a.number_of_items, b.number_of_items, isAsc);
        case "total_amount":
          return compare(a.total_amount, b.total_amount, isAsc);
        case "status":
          return compare(a.status, b.status, isAsc);
        default:
          return 0;
      }
    });
  }
}

function compare(a: number | string | Date, b: number | string | Date, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}