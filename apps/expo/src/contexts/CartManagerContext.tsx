import { createContext, useState } from "react";

import { type CartManagerContextType, type OrderType } from "../../../types";

export const CartManagerContext = createContext<CartManagerContextType | null>(
  null,
);

type CartManagerProviderProps = {
  children: React.ReactNode;
};

export const CartManagerProvider = ({ children }: CartManagerProviderProps) => {
  const [orders, setOrders] = useState<OrderType[]>([]);

  function addToCart(
    productId: number,
    productName: string,
    quantity: number,
    totalPrice: number,
  ) {
    setOrders((prev) => {
      // Check if the product already exists in the cart
      const existingProductIndex = prev.findIndex(
        (order) => order.productId === productId,
      );

      if (existingProductIndex !== -1) {
        // If the product exists, merge the current data with the incoming one
        const updatedOrders = [...prev];
        const existingProduct = updatedOrders[existingProductIndex];

        if (existingProduct) {
          // Calculate the updated quantity and total price
          const updatedQuantity = existingProduct.quantity + quantity;
          const updatedTotalPrice = existingProduct.totalPrice + totalPrice;

          // Update the existing product with merged data
          updatedOrders[existingProductIndex] = {
            ...existingProduct,
            quantity: updatedQuantity,
            totalPrice: updatedTotalPrice,
          };
        }

        return updatedOrders;
      }

      // If the product does not exist, add it to the cart
      return [...prev, { productId, productName, quantity, totalPrice }];
    });
  }

  function removeFromCart(productId: number) {
    setOrders((prev) => prev.filter((order) => order.productId !== productId));
  }

  function clearCart() {
    setOrders([]);
  }

  function getTotalPrice(): string {
    return orders
      .reduce((prev, curr) => {
        return prev + curr.totalPrice;
      }, 0)
      .toFixed(2);
  }

  return (
    <CartManagerContext.Provider
      value={{ orders, addToCart, removeFromCart, clearCart, getTotalPrice }}
    >
      {children}
    </CartManagerContext.Provider>
  );
};
