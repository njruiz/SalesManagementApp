import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Product } from '../_models/product';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  baseUrl = environment.apiUrl;
  products: Product[] = [];

  constructor(private http: HttpClient) {}

  addProduct(model: any) {
    return this.http
      .post(this.baseUrl + 'productmaintenance/create-product', model)
      .pipe(
        map((product: Product) => {
          if (product) {
            return product;
          }
        })
      );
  }

  deleteProductPhoto(productCode: string) {
    return this.http.post(
      this.baseUrl + 'admin/delete-product-photo/' + productCode,
      {}
    );
  }

  deleteProduct(productCode: string) {
    return this.http.delete(
      this.baseUrl + 'productmaintenance/delete-product/' + productCode,
      {}
    );
  }

  editProduct(product: Product, productCode: string) {
    return this.http
      .put(this.baseUrl + 'productmaintenance/' + productCode, product)
      .pipe(map((response: Product[]) => response));
  }

  getProducts() {
    if (this.products.length > 0) return of(this.products);

    return this.http.get<Product[]>(this.baseUrl + 'productmaintenance').pipe(
      map((products) => {
        this.products = products;
        return products;
      })
    );
  }
}
