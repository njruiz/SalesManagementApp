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

  deleteProduct(productCode) {
    return this.http.delete(
      this.baseUrl + 'productmaintenance/delete-product/' + productCode,
      {}
    );
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
