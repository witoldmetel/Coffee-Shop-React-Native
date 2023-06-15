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
    <div className="flex-1 bg-[#F2F2F7]">
      <div>
        <div className="flex-row items-center justify-between">
          <button
            className="flex-row items-center"
            onClick={() => router.back()}
          >
            <AiOutlineArrowLeft size={24} color="#7f4f24" />
            <span className="color-[#7f4f24] ml-2">Products</span>
          </button>
          <button onClick={() => mutate({ id: productDetails.id })}>
            {isProductLiked() ? (
              <AiFillHeart size={24} color="#7F4F24" />
            ) : (
              <AiOutlineHeart size={24} color="#7F4F24" />
            )}
          </button>
        </div>
      </div>

      <div className="m-4 flex-1 items-center rounded-lg bg-[#fff] p-4">
        {/* <ProductImage
          name={productDetails.name}
          url={productDetails.image}
          contentFit="contain"
          contentPosition="top"
          style={{ width: "100%", height: 180 }}
        /> */}
        <Image
          src={getImage(productDetails.image)}
          alt={productDetails.name}
          width={0}
          height={0}
          sizes="100vw"
          style={{ width: "100%", height: "auto" }}
        />
        <h1 className="py-2 text-3xl">{productDetails.name}</h1>
        <p className="text-1xl py-2 text-center">
          {productDetails.description}
        </p>
        <div className="w-full flex-row items-center justify-between">
          <p className="text-1xl py-2">{`$ ${productDetails.price.toFixed(
            2,
          )} ea`}</p>
          <div className="my-8 flex-row rounded-lg bg-[#f2f2f7]">
            <button className="p-2" onClick={decrease}>
              <AiOutlineMinusCircle size={24} color="black" />
            </button>
            <div className="my-2 h-auto w-px bg-[#929299]" />
            <button className="p-2" onClick={increase}>
              <AiOutlinePlusCircle size={24} color="black" />
            </button>
          </div>
        </div>
        <p className="py-2 text-center text-2xl font-bold">
          Subtotal ${getTotalPrice(productDetails.price).toFixed(2)}
        </p>
        <button
          className="my-8 w-full rounded-3xl bg-[#ebd7b3] p-4"
          disabled={count === 0}
          onClick={() =>
            addToCart(
              productDetails.id,
              productDetails.name,
              count,
              getTotalPrice(productDetails.price),
            )
          }
        >
          <span className="text-1xl text-center">Add {count} to cart</span>
        </button>
      </div>
    </div>
  );
};

export default Product;
