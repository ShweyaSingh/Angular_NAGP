import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Product } from 'src/app/shared/models/product';
import { ProductCategory } from 'src/app/shared/models/product-category';
import { ProductService } from 'src/app/shared/services/product.service';

@Component({
  templateUrl: './product-list.component.html',
})
export class ProductListComponent implements OnInit {
  public products: Product[];

  constructor(private router: Router, private productService: ProductService) {}

  public ngOnInit(): void {
    this.productService.getAllProducts().subscribe((response) => {
      this.products = response;
    });
  }

  public viewDetailPage(id: number): void {
    this.router.navigate(['products/product/' + id]);
  }
}
