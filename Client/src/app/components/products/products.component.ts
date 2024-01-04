import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort, Sort } from '@angular/material/sort';
import { AddProductModalComponent } from '../modals/add-product-modal/add-product-modal.component';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Product } from 'src/app/_models/product';
import { ProductService } from 'src/app/_services/product.service';
import { ConfirmService } from 'src/app/_services/confirm.service';
import { EditProductModalComponent } from '../modals/edit-product-modal/edit-product-modal.component';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent implements OnInit {
  products: Partial<Product[]>;
  displayedColumns = ['productCode', 'productName', 'size', 'price', 'actions'];
  dataSource = new MatTableDataSource<Product>();

  sortedData: Product[];

  @ViewChild(MatSort) sort: MatSort;

  constructor(
    public dialog: MatDialog,
    private productService: ProductService,
    private confirmService: ConfirmService
  ) {}

  ngOnInit(): void {
    this.getProducts();
  }

  getProducts(): void {
    this.productService.getProducts().subscribe((products) => {
      this.dataSource.data = products;
      this.dataSource._updateChangeSubscription();
      this.sortedData = this.dataSource.data.slice();
    });
  }

  openProductFormDialog(): void {
    const dialogRef = this.dialog.open(AddProductModalComponent, {
      width: '400px',
    });

    dialogRef.afterClosed().subscribe((newProduct) => {
      if (newProduct) {
        // Add the newProduct to the products array
        const currentData = this.dataSource.data;
        currentData.push(newProduct);
        this.dataSource.data = currentData;
        this.sortedData = this.dataSource.data.slice();
      }
    });
  }

  deleteProduct(product: Product) {
    this.confirmService
      .confirm(
        'Confirm product deletion',
        'Are you sure you want to delete ' + product.productName + '?'
      )
      .subscribe((result) => {
        if (result) {
          this.productService
            .deleteProductPhoto(product.productCode)
            .subscribe();
          this.productService
            .deleteProduct(product.productCode)
            .subscribe(() => {
              this.dataSource.data.splice(
                this.dataSource.data.findIndex(
                  (p) => p.productCode === product.productCode
                )
              );

              this.sortedData = this.dataSource.data.slice();
            });
        }
      });
  }

  editProduct(product: Product) {
    const dialogRef = this.dialog.open(EditProductModalComponent, {
      width: '400px',
      data: { product: { ...product } },
    });

    dialogRef.afterClosed().subscribe((newProducts) => {
      if (newProducts) {
        // Add the newProduct to the products array
        this.dataSource.data = newProducts;
        this.sortedData = this.dataSource.data.slice();
      }
    });
  }

  sortData(sort: Sort) {
    const data = this.dataSource.data.slice();
    if (!sort.active || sort.direction === '') {
      this.sortedData = data;
      return;
    }

    this.sortedData = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'productCode':
          return compare(a.productCode, b.productCode, isAsc);
        case 'productName':
          return compare(a.productName, b.productName, isAsc);
        case 'size':
          return compare(a.size, b.size, isAsc);
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
