import { CartService } from '@ecommerce/core';
import { of } from 'rxjs';
import {
  CartDetail,
  Product,
  ProductCategory,
  ProductWithQty
} from '../models';

describe('CartService', () => {
  let httpClientSpy: { get: jasmine.Spy; post: jasmine.Spy };
  let cartService: CartService;
  let cartDetail: CartDetail;

  beforeEach(() => {
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get', 'post']);
    cartService = new CartService(httpClientSpy as any);
    cartDetail = {
      id: 1,
      email: 'shweta@gmail.com',
      products: [
        {
          product: {
            id: 1,
            name: 'LAVIE Hand bag',
            description: 'LAVIE Hand bag - Women Tan Hobo',
            brand: 'Lavie',
            price: 2879,
            color: 'Brown',
            category: ProductCategory.Accessories,
            imageUrl: '/assets/images/6.jpeg',
          },
          quantity: 1,
        } as ProductWithQty,
      ],
    };
  });

  it('should be created.', () => {
    expect(cartService).toBeTruthy();
  });

  it('service should retun cart details.', () => {
    httpClientSpy.get.and.returnValue(of(cartDetail));
    cartService.getCartDetails().subscribe((result: CartDetail) => {
      expect(result.id).toEqual(cartDetail.id);
    });
    expect(httpClientSpy.get.calls.count()).toBe(1);
  });

  it('service should add product to cart.', () => {
    httpClientSpy.post.and.callFake(() => {
      return of(cartDetail);
    });
    cartService
      .addProduct(testProductsData[0])
      .subscribe((response: CartDetail) => {
        expect(response.id).toEqual(cartDetail.id);
        expect(response.products[0].quantity).toEqual(
          cartDetail.products[0].quantity
        );
      });
    expect(httpClientSpy.post.calls.count()).toBe(1);
  });

  it('service should update product quantity.', () => {
    const qty = 4;
    httpClientSpy.post.and.callFake(() => {
      cartDetail.products[0].quantity = qty;
      return of(cartDetail);
    });
    cartService.changeQty(1, qty).subscribe((response: CartDetail) => {
      expect(response.id).toEqual(cartDetail.id);
      expect(response.email).toEqual(cartDetail.email);
      expect(response.products[0].quantity).toEqual(qty);
    });
    expect(httpClientSpy.post.calls.count()).toBe(1);
  });

  it('service should delete product from cart.', () => {
    httpClientSpy.post.and.callFake(() => {
      cartDetail.products.pop();
      return of(cartDetail);
    });
    cartService.deleteProduct(1).subscribe((response: CartDetail) => {
      expect(response.id).toEqual(cartDetail.id);
      expect(response.email).toEqual(cartDetail.email);
      expect(response.products.length).toEqual(cartDetail.products.length);
    });
    expect(httpClientSpy.post.calls.count()).toBe(1);
  });

  it('service should remove all product from cart.', () => {
    httpClientSpy.post.and.callFake(() => {
      cartDetail.products = [];
      return of(cartDetail);
    });
    cartService.removeAllProducts().subscribe((response: CartDetail) => {
      expect(response.id).toEqual(cartDetail.id);
      expect(response.email).toEqual(cartDetail.email);
      expect(response.products.length).toEqual(0);
    });
    expect(httpClientSpy.post.calls.count()).toBe(1);
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
  ];
});
