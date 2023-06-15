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
      {menuItems?.map((category) => (
        <div key={category.name}>
          <div className="bg-[#ede0d4] p-4">
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
        </div>
      ))}
    </Container>
  );
};

export default Home;
