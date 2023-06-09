import { useEffect, useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";

import { api } from "~/utils/api";
import { type MenuItemType, type ProductType } from "../../../types";

function getMenu() {
  return fetch("https://firtman.github.io/coffeemasters/api/menu.json").then(
    (response) => response.json(),
  );
}

export const useMenu = ({
  productId,
  searchQuery,
}: {
  productId?: number;
  searchQuery?: string;
}): {
  menuItems: MenuItemType[] | undefined;
  status: "error" | "success" | "loading";
  error: unknown;
  productDetails: ProductType | null;
  isProductLiked: () => boolean;
} => {
  const {
    data: menuItems,
    status,
    error,
  } = useQuery<MenuItemType[]>({
    queryKey: ["menu"],
    queryFn: getMenu,
  });

  const filteredMenuItems = useMemo(() => {
    if (searchQuery) {
      return menuItems
        ?.map((category) => ({
          ...category,
          products: category.products.filter((product) =>
            product.name.toLowerCase().includes(searchQuery.toLowerCase()),
          ),
        }))
        .filter((category) => category.products.length > 0);
    } else {
      return menuItems;
    }
  }, [searchQuery, menuItems]);

  const [productDetails, setProductDetails] = useState<ProductType | null>(
    null,
  );

  function getProductById(productId: number) {
    if (menuItems) {
      for (const category of menuItems) {
        for (const product of category.products) {
          if (product.id === productId) {
            setProductDetails(product);
          }
        }
      }
    } else {
      setProductDetails(null); // Return null if product is not found
    }
  }

  useEffect(() => {
    if (productId) {
      getProductById(productId);
    }
  }, [productId]);

  function isProductLiked(): boolean {
    const { data } = api.like.findLike.useQuery({ id: productId });

    if (data) {
      return data.liked;
    } else {
      return false;
    }
  }

  return {
    menuItems: filteredMenuItems,
    status,
    error,
    productDetails,
    isProductLiked,
  };
};
