import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class ProductService {

  constructor(private http: HttpClient) {
  }
  getProducts() {
    return this.http.get<any>('products').pipe().toPromise()
  }
}
