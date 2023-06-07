import React from "react";
import { ScrollView } from "react-native";

import { OfferWrapper } from "~/components";

const OffersScreen = () => {
  return (
    <ScrollView className="flex-1">
      <OfferWrapper
        title="Early Coffee"
        description="10% off. Offer valid from 6am to 9am."
      />
      <OfferWrapper
        title="Welcome Gift"
        description="25% off on your first order"
      />
    </ScrollView>
  );
};

export default OffersScreen;
