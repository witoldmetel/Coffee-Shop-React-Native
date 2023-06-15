import { useState } from "react";
import type { NextPage } from "next";
import Image from "next/image";

import { getImage } from "~/utils/image";
import { Container } from "~/components";
import { useMenu } from "~/hooks/useMenu";

const Home: NextPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const { menuItems, status, error } = useMenu({ searchQuery });

  if (status === "loading")
    return (
      <p className="flex-1" color="#410413">
        Loading...
      </p>
    );

  if (status === "error")
    return (
      <p>
        {typeof error === "object"
          ? JSON.stringify(error)
          : "Cannot fetch data from the server"}
      </p>
    );

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  return (
    <Container>
      <input
        type="text"
        value={searchQuery}
        onChange={handleInputChange}
        placeholder="Search..."
        className="mb-4 rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      {menuItems && menuItems.length ? (
        menuItems.map((category) => (
          <div key={category.name}>
            <div className="bg-transparent p-4">
              <p className="text-base font-bold text-[#410413]">
                {category.name}
              </p>
            </div>
            <div className="grid grid-flow-row-dense auto-rows-max grid-cols-4 gap-4 bg-white p-4">
              {category.products.map((product) => (
                <div key={product.id} className="rounded bg-[#ede0d4]">
                  <div className="flex flex-col items-center">
                    <div className="w-full">
                      <Image
                        src={getImage(product.image)}
                        alt={product.name}
                        width={0}
                        height={0}
                        sizes="100vw"
                        style={{ width: "100%", height: "auto" }}
                      />
                    </div>
                    <div className="flex w-full items-center justify-between p-4">
                      <h3 className="text-lg font-medium">{product.name}</h3>
                      <p className="text-gray-600">$ {product.price}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))
      ) : (
        <p className="flex-1" color="#410413">
          We don&apos;t have such thing in our store
        </p>
      )}
    </Container>
  );
};

export default Home;
