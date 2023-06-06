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
