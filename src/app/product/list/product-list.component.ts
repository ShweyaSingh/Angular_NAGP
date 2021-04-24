import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from 'src/app/core/services/product.service';
import { Product } from 'src/app/core/models/product';

@Component({
  templateUrl: './product-list.component.html',
})
export class ProductListComponent implements OnInit {
  public products: Product[];

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService
  ) {}

  public ngOnInit(): void {
    const search = this.route.snapshot.paramMap.get('search');
    if (search) {
      this.productService
        .searchProducts(search.toLocaleLowerCase())
        .subscribe((response) => {
          this.products = response;
        });
    } else {
      this.productService.getAllProducts().subscribe((response) => {
        this.products = response;
      });
    }
  }
}
