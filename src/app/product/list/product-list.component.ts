import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from 'src/app/shared/models/product';
import { ProductCategory } from 'src/app/shared/models/product-category';

@Component({
  templateUrl: './product-list.component.html',
})
export class ProductListComponent {
  public products: Product[] = [
    {
      id: 1,
      name: 'VAN HEUSEN Heels',
      description: 'Women Green Heels Sandal',
      price: 9,
      color: 'Green',
      category: ProductCategory.Footwear,
      imageUrl: '/assets/images/1.jpeg',
    },
    {
      id: 1,
      name: 'VAN HEUSEN Heels',
      description: 'Women Green Heels Sandal',
      price: 9,
      color: 'Green',
      category: ProductCategory.Footwear,
      imageUrl: '/assets/images/1.jpeg',
    },
    {
      id: 1,
      name: 'VAN HEUSEN Heels',
      description: 'Women Green Heels Sandal',
      price: 9,
      color: 'Green',
      category: ProductCategory.Footwear,
      imageUrl: '/assets/images/1.jpeg',
    },
    {
      id: 1,
      name: 'VAN HEUSEN Heels',
      description: 'Women Green Heels Sandal',
      price: 9,
      color: 'Green',
      category: ProductCategory.Footwear,
      imageUrl: '/assets/images/1.jpeg',
    },
    {
      id: 1,
      name: 'VAN HEUSEN Heels',
      description: 'Women Green Heels Sandal',
      price: 9,
      color: 'Green',
      category: ProductCategory.Footwear,
      imageUrl: '/assets/images/1.jpeg',
    },
    {
      id: 1,
      name: 'VAN HEUSEN Heels',
      description: 'Women Green Heels Sandal',
      price: 9,
      color: 'Green',
      category: ProductCategory.Footwear,
      imageUrl: '/assets/images/1.jpeg',
    }
  ];

  constructor(private router: Router) {}

  public viewDetailPage(id: number): void {
    this.router.navigate(['product/' + id]);
  }
}
