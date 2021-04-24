import { ProductCategory } from './product-category';

export class Product {
  id: number;
  name: string;
  description: string;
  category: ProductCategory;
  color?: string;
  size?: string;
  price: number;
  imageUrl: string;
}
