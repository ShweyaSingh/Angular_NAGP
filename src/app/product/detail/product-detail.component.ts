import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from 'src/app/shared/models/product';
import { ProductCategory } from 'src/app/shared/models/product-category';

@Component({
  templateUrl: './product-detail.component.html',
})
export class ProductDetailComponent implements OnInit {
  public product: Product;

  constructor(private route: ActivatedRoute, private router: Router) {}

  public ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.product = {
      id: 1,
      name: 'VAN HEUSEN Heels',
      description: 'Women Green Heels Sandal',
      price: 9,
      color: 'Green',
      category: ProductCategory.Footwear,
      imageUrl: '/assets/images/1.jpeg'
    }; // this.service.getProduct(id);
  }

  public addToCart(product: Product): void {
    // add product to cart service call
    this.router.navigate(['cart']);
  }
}
