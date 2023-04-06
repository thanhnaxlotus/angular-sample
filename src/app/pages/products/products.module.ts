import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxProductsComponent } from './products.component';
import { FormsModule } from '@angular/forms';
import { ToggleComponent } from './togle.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule
  ],
  declarations: [
    NgxProductsComponent,
    ToggleComponent
  ]
})
export class ProductsModule { }
