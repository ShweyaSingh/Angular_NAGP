import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';
import { ProductService } from '@ecommerce/core';
import { Product, ProductCategory, ProductsCategoryWise } from '../models';

describe('ProductService', () => {
  let httpClientSpy: jasmine.Spy;
  let productService: ProductService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ProductService],
    });

    const httpClient = TestBed.inject(HttpClient);
    productService = TestBed.inject(ProductService);

    httpClientSpy = spyOn(httpClient, 'get');
  });

  it('should be created.', () => {
    expect(productService).toBeTruthy();
  });

  it('service should retun all products.', () => {
    httpClientSpy.and.callFake(() => {
      return of(testProductsData);
    });
    productService
      .getAllProducts()
      .subscribe((result: ProductsCategoryWise[]) => {
        expect(result[0].productCategory).toEqual(testProductsData[0].category);
        expect(result[0].products.length).toEqual(1);
      });
  });

  it('service should retun expected product.', () => {
    httpClientSpy.and.callFake(() => {
      return of(testProductsData[0]);
    });
    productService.getProduct(1).subscribe((response: any) => {
      expect(response.success).toEqual(true);
      expect(response.content.id).toEqual(testProductsData[0].id);
    });
  });

  it('service should retun searched product.', () => {
    httpClientSpy.and.callFake(() => {
      return of(testProductsData);
    });
    productService.searchProducts('shirt').subscribe((response: Product[]) => {
      expect(response.length).toEqual(1);
      expect(response[0].id).toEqual(testProductsData[1].id);
      expect(response[0].name).toEqual(testProductsData[1].name);
    });
  });

  const testProductsData: Product[] = [
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
  ];
});
