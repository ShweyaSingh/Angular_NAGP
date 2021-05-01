import { ProductCategory } from './product-category';

export class Product {
  id: number;
  name: string;
  description: string;
  category: ProductCategory;
  brand: string;
  color?: string;
  size?: string;
  price: number;
  imageUrl: string;
}

export class ProductsCategoryWise {
  productCategory: ProductCategory;
  products: Product[];
}
