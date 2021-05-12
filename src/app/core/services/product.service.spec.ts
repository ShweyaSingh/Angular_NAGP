import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';
import { ProductService } from '@ecommerce/core';
import { Product, ProductCategory, ProductsCategoryWise } from '../models';

describe('ProductService', () => {
  let httpClientSpy: { get: jasmine.Spy; post: jasmine.Spy };
  let productService: ProductService;
  let productsCategoryWise: ProductsCategoryWise[];
  let product: Product;

  beforeEach(() => {
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get', 'post']);
    productService = new ProductService(httpClientSpy as any);
    product = {
      id: 1,
      name: 'LAVIE Hand bag',
      description: 'LAVIE Hand bag - Women Tan Hobo',
      brand: 'Lavie',
      price: 2879,
      color: 'Brown',
      category: ProductCategory.Accessories,
      imageUrl: '/assets/images/6.jpeg',
    };
  });

  it('should be created.', () => {
    expect(productService).toBeTruthy();
  });

  it('service should retun all products.', () => {
    httpClientSpy.get.and.callFake(() => {
      return of(productsCategoryWise);
    });
    productService
      .getAllProducts()
      .subscribe((result: ProductsCategoryWise[]) => {
        expect(result[0].products.length).toEqual(1);
      });
    expect(httpClientSpy.get.calls.count()).toBe(1);
  });

  it('service should retun expected product.', () => {
    httpClientSpy.post.and.callFake(() => {
      return of(product);
    });
    productService.getProduct(1).subscribe((response: Product) => {
      expect(response.id).toEqual(product.id);
      expect(response.name).toEqual(product.name);
    });
    expect(httpClientSpy.post.calls.count()).toBe(1);
  });

  it('service should retun searched product.', () => {
    httpClientSpy.post.and.callFake(() => {
      return of([product]);
    });
    productService.searchProducts('bag').subscribe((response: Product[]) => {
      expect(response[0].id).toEqual(product.id);
      expect(response[0].name).toEqual(product.name);
    });
    expect(httpClientSpy.post.calls.count()).toBe(1);
  });

  productsCategoryWise = [
    {
      productCategory: ProductCategory.Accessories,
      products: [
        {
          id: 1,
          name: 'LAVIE Hand bag',
          description: 'LAVIE Hand bag - Women Tan Hobo',
          brand: 'Lavie',
          price: 2879,
          color: 'Brown',
          category: ProductCategory.Accessories,
          imageUrl: '/assets/images/6.jpeg',
        },
      ],
    },
    {
      productCategory: ProductCategory.Clothing,
      products: [
        {
          id: 2,
          name: 'Seven Rocks T-Shirt',
          description: 'Color Block Men Round Neck Black T-Shirt',
          brand: 'Seven Rocks',
          price: 399,
          color: 'Black',
          size: 'XL, L, M, S, XS',
          category: ProductCategory.Clothing,
          imageUrl: '/assets/images/2.jpeg',
        },
      ],
    },
  ];
});
