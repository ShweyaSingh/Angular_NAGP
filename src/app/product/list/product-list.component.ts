import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product, ProductsCategoryWise, ProductService } from '@ecommerce/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { finalize } from 'rxjs/operators';

@Component({
  templateUrl: './product-list.component.html',
})
export class ProductListComponent implements OnInit {
  public products: Product[] = [];
  public productsCategoryWise: ProductsCategoryWise[] = [];
  public isSearching = false;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private spinner: NgxSpinnerService
  ) { }

  public ngOnInit(): void {
    this.spinner.show();
    const search = this.route.snapshot.paramMap.get('search');
    if (search) {
      this.productService
        .searchProducts(search.toLocaleLowerCase())
        .pipe(
          finalize(() => {
            this.spinner.hide();
          })
        )
        .subscribe((response) => {
          this.products = response;
          this.isSearching = true;
        });
    } else {
      this.productService
        .getAllProducts()
        .pipe(
          finalize(() => {
            this.spinner.hide();
          })
        )
        .subscribe((response) => {
          this.productsCategoryWise = response;
          this.isSearching = false;
        });
    }
  }
}
