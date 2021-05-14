import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { delay, dematerialize, materialize, mergeMap } from 'rxjs/operators';
import {
  CartDetail,
  Product,
  ProductCategory,
  ProductsCategoryWise,
  UserDetail
} from '../models';

@Injectable()
export class FakeBackendInterceptor implements HttpInterceptor {
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const { url, method, headers, body } = request;
    let loggedUser: UserDetail;

    // Using delay observable to simulate server api call
    return of(null)
      .pipe(mergeMap(handleRoute))
      .pipe(materialize())
      .pipe(delay(500))
      .pipe(dematerialize());

    function handleRoute(): Observable<HttpEvent<any>> {
      switch (true) {
        case url.endsWith('/users/authenticate') && method === 'POST':
          return authenticate();
        case url.endsWith('/carts/getCartDetails') && method === 'GET':
          return getCartDetails();
        case url.endsWith('/carts/addToCart') && method === 'POST':
          return addToCart();
        case url.endsWith('/carts/removeFromCart') && method === 'POST':
          return removeFromCart();
        case url.endsWith('/carts/updateQty') && method === 'POST':
          return updateQty();
        case url.endsWith('/carts/emptyCart') && method === 'POST':
          return emptyCart();
        case url.endsWith('/products/getAll') && method === 'GET':
          return getProducts();
        case url.endsWith('/products/getProduct') && method === 'POST':
          return getProduct();
        case url.endsWith('/products/searchProduct') && method === 'POST':
          return searchProduct();
        default:
          return next.handle(request);
      }
    }

    // route functions
    function authenticate(): Observable<HttpResponse<any>> {
      const { email, password } = body;
      const user = Users.find(
        (x) => x.email === email && x.password === password
      );
      if (!user) {
        return error(400, 'login-failure-message');
      }
      loggedUser = user;
      const response = {} as UserDetail;
      response.id = user.id;
      response.email = user.email;
      response.authdata = window.btoa(user.id + ':' + email + ':' + password);
      response.password = '';
      response.name = user.name;
      return ok(response);
    }

    function getCartDetails(): Observable<HttpResponse<any>> {
      if (!isLoggedIn()) {
        return unauthorized();
      }
      const cart = CartDetails.find((u) => u.email === loggedUser.email);
      return ok(cart);
    }

    function addToCart(): Observable<HttpResponse<any>> {
      if (!isLoggedIn()) {
        return unauthorized();
      }
      const { product } = body;
      const cart = CartDetails.find((u) => u.email === loggedUser.email);
      const productExist = cart?.products.find(
        (p) => p.product.id === product.id
      );
      if (productExist !== undefined) {
        productExist.quantity =
          productExist.quantity === 5 ? 5 : productExist.quantity + 1;
      } else {
        cart?.products.push({ product, quantity: 1 });
      }
      return ok(cart);
    }

    function removeFromCart(): Observable<HttpResponse<any>> {
      if (!isLoggedIn()) {
        return unauthorized();
      }
      const { id } = body;
      const cart = CartDetails.find((u) => u.email === loggedUser.email);
      if (cart) {
        const productToRemove = cart.products.find((p) => p.product.id === id);
        const index = productToRemove
          ? cart.products.indexOf(productToRemove)
          : -1;
        if (index !== -1) {
          cart?.products.splice(index, 1);
        }
      }
      return ok(cart);
    }

    function updateQty(): Observable<HttpResponse<any>> {
      if (!isLoggedIn()) {
        return unauthorized();
      }
      const { id, qty } = body;
      const cart = CartDetails.find((u) => u.email === loggedUser.email);
      if (cart) {
        const productToUpdate = cart.products.find((p) => p.product.id === id);
        if (productToUpdate) {
          productToUpdate.quantity = Number(qty);
        }
      }
      return ok(cart);
    }

    function emptyCart(): Observable<HttpResponse<any>> {
      if (!isLoggedIn()) {
        return unauthorized();
      }
      const cart = CartDetails.find((u) => u.email === loggedUser.email);
      if (cart) {
        cart.products = [];
      }
      return ok(cart);
    }

    function getProducts(): Observable<HttpResponse<any>> {
      const productsCategoryWise: ProductsCategoryWise[] = [];
      productsCategoryWise.push({
        productCategory: ProductCategory.Accessories,
        products: Products.filter(
          (p) => p.category === ProductCategory.Accessories
        ),
      });

      productsCategoryWise.push({
        productCategory: ProductCategory.Clothing,
        products: Products.filter(
          (p) => p.category === ProductCategory.Clothing
        ),
      });

      productsCategoryWise.push({
        productCategory: ProductCategory.Electronics,
        products: Products.filter(
          (p) => p.category === ProductCategory.Electronics
        ),
      });

      productsCategoryWise.push({
        productCategory: ProductCategory.Footwear,
        products: Products.filter(
          (p) => p.category === ProductCategory.Footwear
        ),
      });

      productsCategoryWise.push({
        productCategory: ProductCategory.Jewellery,
        products: Products.filter(
          (p) => p.category === ProductCategory.Jewellery
        ),
      });
      return ok(productsCategoryWise);
    }

    function getProduct(): Observable<HttpResponse<any>> {
      const { id } = body;
      const product = Products.find((p) => p.id === id);
      if (!product) {
        return error(400, 'product-not-found');
      }
      return ok(product);
    }

    function searchProduct(): Observable<HttpResponse<any>> {
      const { search } = body;
      const products = Products.filter(
        (p) =>
          p.name.toLocaleLowerCase().includes(search) ||
          p.description.toLocaleLowerCase().includes(search)
      );
      return ok(products);
    }

    // helper functions

    function ok(response: any): Observable<HttpResponse<any>> {
      return of(new HttpResponse({ status: 200, body: response }));
    }

    function error(code: number, message: any): Observable<HttpResponse<any>> {
      return throwError({ status: code, error: { message } });
    }

    function unauthorized(): Observable<HttpResponse<any>> {
      return throwError({ status: 401, error: { message: 'Unauthorised' } });
    }

    function getUserDetails(email: string, id: number): UserDetail | undefined {
      return Users.find((user) => user.id === id && user.email === email);
    }

    function isLoggedIn(): boolean {
      const user = localStorage.getItem('currentUser');
      const currentUser: UserDetail = user ? JSON.parse(user) : null;
      if (headers.get('Authorization') && currentUser) {
        const userDetail = getUserDetails(currentUser.email, currentUser.id);
        if (userDetail) {
          loggedUser = currentUser;
          const authData = window.btoa(
            currentUser.id + ':' + currentUser.email + ':' + userDetail.password
          );
          return headers.get('Authorization') === `Basic ${authData}`;
        }
      }
      return false;
    }
  }
}

const Users: UserDetail[] = [
  {
    id: 1,
    name: 'Shweta',
    email: 'shweta@gmail.com',
    password: '12345',
    address: '',
    phone: '2233445566',
  },
  {
    id: 2,
    name: 'Swati',
    email: 'swati@gmail.com',
    password: '11111',
    address: '',
    phone: '2233445566',
  },
  {
    id: 3,
    name: 'Chinju',
    email: 'chinju@gmail.com',
    password: '22222',
    address: '',
    phone: '2233445566',
  },
  {
    id: 4,
    name: 'Harsh',
    email: 'harsh@gmail.com',
    password: '33333',
    address: '',
    phone: '2233445566',
  },
];

const CartDetails: CartDetail[] = [
  {
    id: 1,
    email: 'shweta@gmail.com',
    products: [],
  },
  {
    id: 2,
    email: 'swati@gmail.com',
    products: [],
  },
  {
    id: 3,
    email: 'chinju@gmail.com',
    products: [],
  },
  {
    id: 4,
    email: 'harsh@gmail.com',
    products: [],
  },
];

const Products: Product[] = [
  {
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
  {
    id: 3,
    name: 'FastColors T-Shirt',
    description: 'Solid Men Mandarin Collar White, Black T-Shirt',
    brand: 'FastColors',
    price: 499,
    color: 'Black',
    size: 'XL, L, M, S, XS',
    category: ProductCategory.Clothing,
    imageUrl: '/assets/images/3.jpeg',
  },
  {
    id: 4,
    name: 'Apple iPhone XR',
    description:
      'Apple iPhone XR (Black, 64 GB) (Includes EarPods, Power Adapter) mobile',
    brand: 'Apple',
    price: 41999,
    color: 'Black, Red, Blue',
    category: ProductCategory.Electronics,
    imageUrl: '/assets/images/4.jpeg',
  },
  {
    id: 5,
    name: 'SAMSUNG Galaxy S10 Lite',
    description:
      'SAMSUNG Galaxy S10 Lite (Prism Black, 512 GB)  (8 GB RAM) mobile',
    brand: 'Samsung',
    price: 45999,
    color: 'Black, Blue, White',
    category: ProductCategory.Electronics,
    imageUrl: '/assets/images/5.jpeg',
  },
  {
    id: 6,
    name: 'LAVIE Hand bag',
    description: 'LAVIE Hand bag - Women Tan Hobo',
    brand: 'Lavie',
    price: 2879,
    color: 'Brown',
    category: ProductCategory.Accessories,
    imageUrl: '/assets/images/6.jpeg',
  },
  {
    id: 7,
    name: 'SAFARI Backpack Daypack',
    description: 'SAFARI Backpack Daypack - Small 15 L Backpack Daypack (Blue)',
    brand: 'SAFARI',
    price: 799,
    color: 'Blue',
    category: ProductCategory.Accessories,
    imageUrl: '/assets/images/7.jpeg',
  },
  {
    id: 8,
    name: 'VINCENT CHASE Glass',
    description:
      'VINCENT CHASE - Full Rim Round Anti Glare & Blue Cut Computer Glass (50 mm)',
    brand: 'VINCENT CHASE',
    price: 1063,
    color: 'Blue',
    category: ProductCategory.Accessories,
    imageUrl: '/assets/images/8.jpeg',
  },
  {
    id: 9,
    name: 'PUMA t-shirt',
    description: 'PUMA - Striped Women Round Neck Maroon, White T-Shirt',
    brand: 'PUMA',
    price: 999,
    color: 'White',
    size: 'XL, L, M, S, XS',
    category: ProductCategory.Clothing,
    imageUrl: '/assets/images/9.jpeg',
  },
  {
    id: 10,
    name: 'Nokia 2.4 (Fjord Blue)',
    description: 'Nokia 2.4 (Fjord Blue, 64 GB) (3 GB RAM) mobile',
    brand: 'Nokia',
    price: 45999,
    color: 'Fjord Blue, Charcoal Grey, Dusk Purple',
    category: ProductCategory.Electronics,
    imageUrl: '/assets/images/10.jpeg',
  },
  {
    id: 11,
    name: 'BATA Flip Flops',
    description: 'Women brown Flip Flops',
    brand: 'BATA',
    price: 799,
    color: 'Green',
    size: '10, 9 , 8 , 7 , 6, 5',
    category: ProductCategory.Footwear,
    imageUrl: '/assets/images/11.jpeg',
  },
  {
    id: 12,
    name: 'PUMA running shoes',
    description: 'PUMA - Running Shoes For Men (White)',
    brand: 'PUMA',
    price: 2048,
    color: 'White',
    size: '10, 9 , 8 , 7 , 6, 5',
    category: ProductCategory.Footwear,
    imageUrl: '/assets/images/12.jpeg',
  },
];
