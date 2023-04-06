import { Component, OnInit } from "@angular/core";
import { ProductService } from "../../service/product.service";
import { Product } from "../../models/products";

@Component({
  selector: "ngx-products",
  templateUrl: './products.component.html'
})
export class NgxProductsComponent implements OnInit {
  products: Product[];
  public arr = [1,2,3,4];

  constructor(private productService: ProductService) {

  }


  ngOnInit(): void {
    this.productService.getProducts().subscribe(
      (products) => {
        this.products = products
        console.log('-----data-----', this.products)
      }
    )
    this.arr = [1,2,3,4];
    console.log("arr", this.arr)
  }
}
