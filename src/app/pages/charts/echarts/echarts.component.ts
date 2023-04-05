import { Component } from '@angular/core';
import { ProductService } from '../../../service/product.service';

@Component({
  selector: 'ngx-echarts',
  styleUrls: ['./echarts.component.scss'],
  templateUrl: './echarts.component.html',
})
export class EchartsComponent {
  constructor(private productService: ProductService) {
    productService.getProducts().then(data => console.log('-----data-----', data));
  }
}
