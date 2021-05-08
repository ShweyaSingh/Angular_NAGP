import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import {
  CartDetail,
  CartService,
  NotificationService,
  Product,
} from '@ecommerce/core';
import { AppConstants } from '@ecommerce/shared';
import {
  TranslateLoader,
  TranslateModule,
  TranslateService,
} from '@ngx-translate/core';
import { Observable, of } from 'rxjs';
import { HttpLoaderFactory } from 'src/app/app.module';
import { ProductItemComponent } from './product-item.component';

describe('ProductItemComponent', () => {
  let fixture: ComponentFixture<ProductItemComponent>;
  let component: ProductItemComponent;
  let translate: any;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        CommonModule,
        TranslateModule.forRoot({
          loader: {
            provide: TranslateLoader,
            useFactory: HttpLoaderFactory,
            deps: [HttpClient],
          },
        }),
        HttpClientModule,
      ],
      providers: [
        {
          provide: CartService,
          useValue: {
            addProduct: (): Observable<{
              success: boolean;
              content: CartDetail;
            }> => {
              return of({
                success: true,
                content: {
                  id: 1,
                  email: 'test@mail.com',
                  products: [],
                } as CartDetail,
              });
            },
          },
        },
        {
          provide: NotificationService,
          useValue: {
            showInfo: (): void => {},
            showError: (): void => {},
          },
        },
      ],
      declarations: [ProductItemComponent],
    }).compileComponents();
    fixture = TestBed.createComponent(ProductItemComponent);
    component = fixture.componentInstance;
    translate = TestBed.inject(TranslateService);
    localStorage.setItem('TOKEN', AppConstants.authToken);
    localStorage.setItem('EMAIL', 'test@mail.com');
    component.product = DummyProduct;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should navigate to product detail page', () => {
    // tslint:disable-next-line: no-string-literal
    const navigateSpy = spyOn(component['router'], 'navigate');
    component.viewDetailPage(1);
    expect(navigateSpy).toHaveBeenCalledWith(['products/product/1']);
  });

  it('should add product to cart and navigate to cart page', () => {
    // tslint:disable-next-line: no-string-literal
    const navigateSpy = spyOn(component['router'], 'navigate');
    component.addToCart(DummyProduct);
    expect(navigateSpy).toHaveBeenCalledWith(['user/cart']);
  });

  const DummyProduct = {
    id: 1,
    name: 'VAN HEUSEN Heels',
    description: 'Women Green Heels Sandal',
    brand: 'VAN HEUSEN',
    price: 1048,
    color: 'Green',
    size: '10, 9 , 8 , 7 , 6, 5',
    category: 'Footwear',
    imageUrl: '/assets/images/1.jpeg',
  } as Product;
});
