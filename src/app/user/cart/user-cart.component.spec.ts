import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import {
  AuthenticationService,
  CartDetail,
  CartService,
  NotificationService,
  Product,
  ProductCategory,
} from '@ecommerce/core';
import {
  TranslateLoader,
  TranslateModule,
  TranslateService,
} from '@ngx-translate/core';
import { NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';
import { Observable, of } from 'rxjs';
import { HttpLoaderFactory } from 'src/app/app.module';
import { UserCartComponent } from './user-cart.component';

describe('UserCartComponent', () => {
  let fixture: ComponentFixture<UserCartComponent>;
  let component: UserCartComponent;
  let authenticationService: AuthenticationService;
  let translate: any;
  let spinner: NgxSpinnerService;

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
        NgxSpinnerModule,
        HttpClientModule,
        BrowserAnimationsModule
      ],
      providers: [
        {
          provide: CartService,
          useValue: {
            getCartDetails: (): Observable<CartDetail> => {
              return of({
                id: 1,
                email: 'test@mail.com',
                products: [],
              });
            },
            deleteProduct: (): Observable<CartDetail> => {
              return of({
                id: 1,
                email: 'test@mail.com',
                products: [],
              });
            },
            changeQty: (): Observable<CartDetail> => {
              return of({
                id: 1,
                email: 'test@mail.com',
                products: [
                  {
                    quantity: 2,
                    product: {
                      id: 1,
                      name: 'VAN HEUSEN Heels',
                      description: 'Women Green Heels Sandal',
                      brand: 'VAN HEUSEN',
                      price: 1048,
                      color: 'Green',
                      size: '10, 9 , 8 , 7 , 6, 5',
                      category: ProductCategory.Footwear,
                      imageUrl: '/assets/images/1.jpeg',
                    },
                  },
                ],
              });
            },
          },
        },
        {
          provide: NotificationService,
          useValue: {
            showInfo: (): void => {},
          },
        },
        AuthenticationService,
      ],
      declarations: [UserCartComponent],
    }).compileComponents();
    fixture = TestBed.createComponent(UserCartComponent);
    component = fixture.componentInstance;
    translate = TestBed.inject(TranslateService);
    spinner = TestBed.inject(NgxSpinnerService);
    authenticationService = TestBed.inject(AuthenticationService);
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should delete product from cart', () => {
    component.deleteProduct(1);
    expect(component.cart.products.length).toEqual(0);
  });

  it('should navigate to user checkout page', () => {
    // tslint:disable-next-line: no-string-literal
    const navigateSpy = spyOn(component['router'], 'navigate');
    component.checkOut();
    expect(navigateSpy).toHaveBeenCalledWith(['user/checkout']);
  });

  it('should change the quantity in cart', () => {
    component.changeQty(1, 2);
    expect(component.cart.products[0].quantity).toEqual(2);
  });

  it('should return expected value of shippingPrice and totalProductPrice', () => {
    component.cart = {
      id: 1,
      email: 'test@mail.com',
      products: [
        {
          quantity: 2,
          product: {
            id: 1,
            name: 'VAN HEUSEN Heels',
            description: 'Women Green Heels Sandal',
            brand: 'VAN HEUSEN',
            price: 1048,
            color: 'Green',
            size: '10, 9 , 8 , 7 , 6, 5',
            category: ProductCategory.Footwear,
            imageUrl: '/assets/images/1.jpeg',
          },
        },
      ],
    };
    expect(component.shippingPrice).toEqual(10);
    expect(component.totalProductPrice).toEqual(2096);
  });
});
