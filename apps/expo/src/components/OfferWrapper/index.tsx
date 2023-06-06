import React from "react";
import {
  ImageBackground,
  StyleSheet,
  Text,
  View,
  type ImageSourcePropType,
} from "react-native";

type OfferWrapperProps = {
  title: string;
  description: string;
};

const OfferWrapper = ({ title, description }: OfferWrapperProps) => {
  return (
    <View style={styles.container}>
      <ImageBackground
        source={
          require("../../../assets/Background/background.png") as ImageSourcePropType
        }
        resizeMode="cover"
        style={styles.image}
      >
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.description}>{description}</Text>
      </ImageBackground>
    </View>
  );
};

export default OfferWrapper;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    maxHeight: 220,
  },
  image: {
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    padding: 14,
    backgroundColor: "#EDE0D4",
    marginBottom: 8,
  },
  description: {
    fontSize: 18,
    padding: 14,
    backgroundColor: "#EDE0D4",
  },
});
