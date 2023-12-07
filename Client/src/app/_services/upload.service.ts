import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UploadService {
  baseUrl = environment.apiUrl;

  constructor(private httpClient: HttpClient) {}

  public uploadfile(file: File, productCode) {
    let url = this.baseUrl + 'productmaintenance/' + productCode + '/add-photo';
    let formParams = new FormData();
    formParams.append('file', file);
    return this.httpClient.post(url, formParams);
  }
}
