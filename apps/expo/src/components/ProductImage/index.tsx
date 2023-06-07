import {
  Image,
  type ImageContentFit,
  type ImageContentPosition,
  type ImageStyle,
} from "expo-image";

const getImage = (url: string) =>
  `https://firtman.github.io/coffeemasters/api/images/${url}`;

type ProductImageProps = {
  name: string;
  url: string;
  contentFit?: ImageContentFit;
  contentPosition?: ImageContentPosition;
  className?: string;
  style?: ImageStyle;
};

const ProductImage = ({
  name,
  url,
  contentFit = "cover",
  contentPosition,
  className,
  style,
}: ProductImageProps) => {
  return (
    <Image
      className={className}
      // style is added cause some css attributes like aspect ratio doesn't work properly for react native and tailwind
      style={style}
      source={getImage(url)}
      contentFit={contentFit}
      contentPosition={contentPosition ?? "center"}
      transition={1000}
      alt={`${name}-image`}
    />
  );
};

export default ProductImage;
