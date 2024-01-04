import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ProductPhoto } from '../_models/productPhoto';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class UploadService {
  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  uploadProductPhoto(file: File, productCode) {
    let url = this.baseUrl + 'productmaintenance/' + productCode + '/add-photo';
    let formParams = new FormData();
    formParams.append('file', file);
    return this.http
      .post(url, formParams)
      .pipe(map((productPhoto: ProductPhoto) => productPhoto));
  }

  updateProductPhoto(file: File, productCode) {
    let url = this.baseUrl + 'productmaintenance/' + productCode + '/update-photo';
    let formParams = new FormData();
    formParams.append('file', file);
    return this.http
      .post(url, formParams)
      .pipe(map((productPhoto: ProductPhoto) => productPhoto));
  }
}
