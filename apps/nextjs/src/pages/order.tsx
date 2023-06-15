import { useState } from "react";
import type { NextPage } from "next";

import { Container } from "~/components";
import { useCartManager } from "~/hooks/useCartManager";

const Order: NextPage = () => {
  const { orders, getTotalPrice, removeFromCart } = useCartManager();
  const [userName, setUserName] = useState("");
  const [phone, setPhone] = useState("");

  if (!orders || orders.length === 0) {
    return (
      <div className="my-4 flex-1 items-center justify-center ">
        <p className="my-4 text-lg font-semibold text-black">
          You don&apos;t have any orders
        </p>
      </div>
    );
  }

  return (
    <Container>
      <div className="flex-1 p-8">
        <p className="my-4 ml-4 font-semibold text-gray-400">ITEMS</p>
        <div className="rounded-lg bg-[#ede0d4] p-4">
          {orders.map((item, index) => (
            <div key={item.productId}>
              <div className="flex-row items-center justify-between bg-[#ede0d4] py-4">
                <p className="font-semibold">{`${item.quantity}x ${item.productName}`}</p>
                <div className="flex-row items-center">
                  <p className="mr-2">$ {item.totalPrice.toFixed(2)}</p>
                  <button onClick={() => removeFromCart(item.productId)}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="#dd3a0a"
                      className="h-6 w-6"
                    >
                      <path
                        fillRule="evenodd"
                        d="M9 2a1 1 0 0 0-1 1v11a1 1 0 1 0 2 0V3a1 1 0 0 0-1-1zm3 0a1 1 0 0 0-1 1v11a1 1 0 1 0 2 0V3a1 1 0 0 0-1-1zM5 4a1 1 0 0 0-1 1v9a1 1 0 1 0 2 0V5a1 1 0 0 0-1-1zm6-2a1 1 0 0 0-1 1v9a1 1 0 1 0 2 0V3a1 1 0 0 0-1-1z"
                      />
                    </svg>
                  </button>
                </div>
              </div>
              {index !== orders.length - 1 && (
                <div className="my-2 h-px w-full bg-[#929299]" />
              )}
            </div>
          ))}
        </div>
        <p className="my-4 ml-4 font-semibold text-gray-400">YOUR DETAILS</p>
        {/* @todo: Add missing validation */}
        <div className="rounded-lg bg-[#ede0d4] px-4">
          <input
            type="text"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            placeholder="Your Name"
            className="my-4 bg-white p-2"
          />
          <input
            type="text"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="Your Phone"
            className="mb-4 bg-white p-2"
          />
        </div>
        <div className="flex-row items-center justify-center py-8">
          <p className="mr-8">Total</p>
          <p className="font-semibold">$ {getTotalPrice()}</p>
        </div>
        <button
          className="mb-12 w-full rounded-3xl bg-[#DDB892] p-4"
          onClick={() => console.log("Order")}
        >
          <p className="text-1xl text-center">Place Order</p>
        </button>
      </div>
    </Container>
  );
};

export default Order;
