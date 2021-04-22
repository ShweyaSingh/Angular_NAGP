import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/shared/models/product';
import { ProductService } from 'src/app/core/services/product.service';

@Component({
  templateUrl: './product-list.component.html',
})
export class ProductListComponent implements OnInit {
  public products: Product[];

  constructor(private productService: ProductService) {}

  public ngOnInit(): void {
    this.productService.getAllProducts().subscribe((response) => {
      this.products = response;
    });
  }
}
