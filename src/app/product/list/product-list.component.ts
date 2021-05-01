import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product, ProductsCategoryWise, ProductService } from '@ecommerce/core';

@Component({
  templateUrl: './product-list.component.html',
})
export class ProductListComponent implements OnInit {
  public products: Product[] = [];
  public productsCategoryWise: ProductsCategoryWise[] = [];
  public isSearching = false;

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
          this.isSearching = true;
        });
    } else {
      this.productService.getAllProducts().subscribe((response) => {
        this.productsCategoryWise = response;
        this.isSearching = false;
      });
    }
  }
}
