import { ProductCategory } from './product-category';

export interface Product {
  id: number;
  name: string;
  description: string;
  category: ProductCategory;
  color: string;
  price: number;
  imageUrl: string;
}
