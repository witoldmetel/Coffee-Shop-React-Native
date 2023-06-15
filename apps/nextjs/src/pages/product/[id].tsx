import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import {
  AiFillHeart,
  AiOutlineArrowLeft,
  AiOutlineHeart,
  AiOutlineMinusCircle,
  AiOutlinePlusCircle,
} from "react-icons/ai";

import { api } from "~/utils/api";
import { getImage } from "~/utils/image";
import { useCartManager } from "~/hooks/useCartManager";
import { useMenu } from "~/hooks/useMenu";

const Product = () => {
  const router = useRouter();
  const { id } = router.query;
  const [count, setCount] = useState(0);
  const { addToCart } = useCartManager();
  const { productDetails, isProductLiked } = useMenu({ productId: Number(id) });

  const { like } = api.useContext();
  const { mutate } = api.like.toggleLike.useMutation({
    onSuccess: async () => {
      await like.findLike.invalidate();
    },
  });

  if (!productDetails) return <div>Loading...</div>;

  const increase = () => {
    setCount((count) => count + 1);
  };

  const decrease = () => {
    if (count > 0) {
      setCount((count) => count - 1);
    }
  };

  const getTotalPrice = (price: number): number => count * price;

  return (
    <div className="flex-1 rounded-xl bg-[#F2F2F7] p-2">
      <div className="flex w-full flex-row items-center justify-between p-4">
        <button onClick={() => router.back()}>
          <AiOutlineArrowLeft size={24} color="#7f4f24" />
        </button>
        <span className="color-[#7f4f24] ml-2">Products</span>
        <div />
      </div>

      <div className="m-4 flex flex-1 flex-col items-center rounded-lg bg-[#fff] p-4">
        <Image
          src={getImage(productDetails.image)}
          alt={productDetails.name}
          width={510}
          height={180}
        />
        <h1 className="py-2 text-3xl">{productDetails.name}</h1>
        <p className="text-1xl py-2 text-center">
          {productDetails.description}
        </p>
        <div className="flex w-full flex-row items-center justify-center">
          <p className="text-1xl py-2">{`$ ${productDetails.price.toFixed(
            2,
          )} ea`}</p>
          <div className="my-8 ml-4 flex flex-row rounded-lg bg-[#f2f2f7]">
            <button className="p-2" onClick={decrease}>
              <AiOutlineMinusCircle size={35} color="black" />
            </button>
            <div className="my-2 h-auto w-px bg-[#929299]" />
            <button className="p-2" onClick={increase}>
              <AiOutlinePlusCircle size={35} color="black" />
            </button>
          </div>
        </div>
        <p className="py-2 text-center text-2xl font-bold">
          Subtotal ${getTotalPrice(productDetails.price).toFixed(2)}
        </p>
        <button
          className="my-8 w-full rounded-3xl bg-[#ebd7b3] p-4"
          disabled={count === 0}
          onClick={() => {
            addToCart(
              productDetails.id,
              productDetails.name,
              count,
              getTotalPrice(productDetails.price),
            );
            router.back();
          }}
        >
          <span className="text-1xl text-center">Add {count} to cart</span>
        </button>
      </div>
    </div>
  );
};

export default Product;
