import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import {
  AuthenticationService,
  CartDetail,
  CartService,
  NotificationService,
  Product
} from '@ecommerce/core';
import {
  TranslateLoader,
  TranslateModule,
  TranslateService
} from '@ngx-translate/core';
import { Observable, of } from 'rxjs';
import { HttpLoaderFactory } from 'src/app/app.module';
import { ProductItemComponent } from './product-item.component';

describe('ProductItemComponent', () => {
  let fixture: ComponentFixture<ProductItemComponent>;
  let component: ProductItemComponent;
  let authenticationService: AuthenticationService;
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
            addProduct: (): Observable<CartDetail> => {
              return of({
                id: 1,
                email: 'test@mail.com',
                products: [],
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
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      declarations: [ProductItemComponent],
    }).compileComponents();
    fixture = TestBed.createComponent(ProductItemComponent);
    component = fixture.componentInstance;
    translate = TestBed.inject(TranslateService);
    authenticationService = TestBed.inject(AuthenticationService);
    spyOnProperty(
      authenticationService,
      'currentUserValue',
      'get'
    ).and.returnValue(DummyUser);
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
    expect(navigateSpy).toHaveBeenCalledWith(['product/1']);
  });

  it('should add product to cart and navigate to cart page', () => {
    // tslint:disable-next-line: no-string-literal
    const navigateSpy = spyOn(component['router'], 'navigate');
    component.addToCart(DummyProduct);
    expect(navigateSpy).toHaveBeenCalledWith(['user/cart']);
  });

  it('should return expected value of isLoggedIn', () => {
    expect(component.isLoggedIn).toEqual(true);
  });

  it('should return expected value of currentUser', () => {
    expect(component.currentUser?.id).toEqual(DummyUser.id);
    expect(component.currentUser?.name).toEqual(DummyUser.name);
  });

  it('should render expected elements', () => {
    expect(
      fixture.nativeElement.querySelectorAll('p.card-text').length
    ).toEqual(2);
  });

  it('should render buttons', () => {
    expect(
      fixture.nativeElement.querySelectorAll('button.btn').length
    ).toEqual(2);
  });

  it('should render image element', () => {
    expect(
      fixture.nativeElement.querySelectorAll('img.card-img-top').length
    ).toEqual(1);
  });

  const DummyUser = {
    id: 1,
    name: 'Shweta',
    email: 'shweta@gmail.com',
    password: '12345',
    address: '',
    phone: '2233445566',
  };
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
