import { Product } from './product';

export class CartDetail {
  id: number;
  email: string;
  products: ProductWithQty[];
}

export class ProductWithQty {
  product: Product;
  quantity: number;
}
