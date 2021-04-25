import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product, ProductService } from '@ecommerce/core';

@Component({
  templateUrl: './product-list.component.html',
})
export class ProductListComponent implements OnInit {
  public products: Product[] = [];

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
