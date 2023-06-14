import { useState } from "react";
import type { NextPage } from "next";

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

  return (
    <Container>
      {menuItems?.map((category) => (
        <>
          <div key={category.name} className="rounded-lg bg-[#ede0d4] p-4">
            <p className="text-base font-bold text-[#410413]">
              {category.name}
            </p>
          </div>
          <div className="grid grid-flow-row-dense auto-rows-max grid-cols-3 gap-4 bg-white p-4">
            {category.products.map((product) => (
              <div key={product.id} className="w-32">
                {product.name}
              </div>
            ))}
          </div>
        </>
      ))}
    </Container>
  );
};

export default Home;
