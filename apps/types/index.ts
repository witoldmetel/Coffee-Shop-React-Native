export type MenuItemType = {
  name: string;
  products: ProductType[];
};

export type ProductType = {
  id: number;
  name: string;
  price: number;
  description: string;
  image: string;
};

export type OrderType = {
  productId: number;
  productName: string;
  quantity: number;
  totalPrice: number;
};

export type CartManagerContextType = {
  orders: OrderType[];
  addToCart: (
    productId: number,
    productName: string,
    quantity: number,
    totalPrice: number,
  ) => void;
};
