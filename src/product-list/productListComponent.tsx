import { Box, Flex, Image, Td, Tr } from "@chakra-ui/react";
import { useProductApi } from "../Hooks/useProductData";
import { Product } from "../Stores/Api/Types/type";
import limitText from "../Utils/limitText";
import Loading from "../Component/loading";
import withLoadingIndicator from "../HOC/withLoadingIndicator";

interface ProductListProps {
  product: Product;
  index: number;
}

const ProductListComponent: React.FC<ProductListProps> = ({
  product,
  index,
}) => {
  console.log(product.tags);

  return (
    <Tr>
      <Td>{index + 1}</Td>
      <Td>
        <Image src={product?.media[0].url} />
      </Td>
      <Td>{limitText(product?.title, 50)}</Td>
      <Td>{limitText(product?.description, 50)}</Td>
      <Td isNumeric>{product?.price}</Td>
      <Td>{product?.product_type?.label || null}</Td>
      <Td>
        <Flex flexWrap={"wrap"} gap={"2px"}>
          {product?.tags !== undefined &&
            product?.tags?.map((tag: any) => (
              <Box
                as="span"
                fontSize={"12px"}
                backgroundColor={"gray.200"}
                p={"1px 2px"}
                borderRadius={"2px"}
              >
                {limitText(tag?.label, 6) || null}
              </Box>
            ))}
        </Flex>
      </Td>
    </Tr>
  );
};

export default withLoadingIndicator(ProductListComponent);
