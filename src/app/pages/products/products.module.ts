import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgxProductsComponent } from './products.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule
  ],
  declarations: [
    NgxProductsComponent,
  ]
})
export class ProductsModule { }
