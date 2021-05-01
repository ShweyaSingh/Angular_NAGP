import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Product, ProductCategory, ProductsCategoryWise } from '../models';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private PRODUCT_SERVICE_BASE_URL = '/assets/data/products.json';

  constructor(private readonly http: HttpClient) {}

  /**
   * Get All Products
   */
  public getAllProducts(): Observable<ProductsCategoryWise[]> {
    return this.http.get<Product[]>(this.PRODUCT_SERVICE_BASE_URL).pipe(
      map((productList) => {
        const productsCategoryWise: ProductsCategoryWise[] = [];
        productsCategoryWise.push({
          productCategory: ProductCategory.Accessories,
          products: productList.filter(
            (p) => p.category === ProductCategory.Accessories
          ),
        });

        productsCategoryWise.push({
          productCategory: ProductCategory.Clothing,
          products: productList.filter(
            (p) => p.category === ProductCategory.Clothing
          ),
        });

        productsCategoryWise.push({
          productCategory: ProductCategory.Electronics,
          products: productList.filter(
            (p) => p.category === ProductCategory.Electronics
          ),
        });

        productsCategoryWise.push({
          productCategory: ProductCategory.Footwear,
          products: productList.filter(
            (p) => p.category === ProductCategory.Footwear
          ),
        });

        productsCategoryWise.push({
          productCategory: ProductCategory.Jewellery,
          products: productList.filter(
            (p) => p.category === ProductCategory.Jewellery
          ),
        });
        return productsCategoryWise;
      })
    );
  }

  /**
   * getProduct
   */
  public getProduct(
    id: number
  ): Observable<{ success: boolean; content: Product }> {
    return this.http.get<Product[]>(this.PRODUCT_SERVICE_BASE_URL).pipe(
      map((products) => {
        const product = products.find((p) => p.id === id);
        if (product !== undefined) {
          return { success: true, content: product };
        } else {
          return { success: false, content: new Product() };
        }
      })
    );
  }

  /**
   * Search Products
   */
  public searchProducts(search: string): Observable<Product[]> {
    return this.http.get<Product[]>(this.PRODUCT_SERVICE_BASE_URL).pipe(
      map((products) => {
        return products.filter(
          (p) =>
            p.name.toLocaleLowerCase().includes(search) ||
            p.description.toLocaleLowerCase().includes(search)
        );
      })
    );
  }
}
