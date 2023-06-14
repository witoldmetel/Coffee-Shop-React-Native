import type { NextPage } from "next";
import Image from "next/image";

import { Container } from "~/components";

const Offers: NextPage = () => {
  return (
    <Container>
      <div className="flex flex-col items-center justify-center ">
        {[
          {
            title: "Early Coffee",
            description: "10% off. Offer valid from 6am to 9am.",
          },
          {
            title: "Welcome Gift",
            description: "25% off on your first order",
          },
        ].map((item) => (
          <div
            key={item.title}
            className="relative my-3 h-60 w-full rounded bg-[#fff] p-4 shadow-2xl lg:h-80 lg:max-w-2xl"
          >
            <Image
              src="/Background/background.png"
              fill
              alt="offer background"
            />
            <div className="relative z-10 flex h-full flex-col items-center justify-center">
              <h1 className="bg-[#EDE0D4] p-4 text-2xl font-bold text-black">
                {item.title}
              </h1>
              <p className="mt-4 bg-[#EDE0D4]  p-4 text-sm text-black">
                {item.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </Container>
  );
};

export default Offers;
