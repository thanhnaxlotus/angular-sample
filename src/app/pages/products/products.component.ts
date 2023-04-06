import { Component, OnInit } from "@angular/core";
import { ProductService } from "../../service/product.service";
import { Product } from "../../models/products";

@Component({
  selector: "ngx-products",
  templateUrl: './products.component.html'
})
export class NgxProductsComponent implements OnInit {
  products: Product[];
  title: string = "List product"
  checked = true;

  constructor(private productService: ProductService) {

  }
  ngOnInit(): void {
    this.productService.getProducts().subscribe(
      (products) => {
        this.products = products
      }
    )
  }
}
