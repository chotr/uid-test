import { Box, Flex, Image, Td, Tr } from "@chakra-ui/react";
import { useDeleteProductApi, useProductApi } from "../Hooks/useProductData";
import { Product } from "../Stores/Api/Types/type";
import limitText from "../Utils/limitText";
import Loading from "../Component/loading";
import withLoadingIndicator from "../HOC/withLoadingIndicator";
import { DeleteIcon } from "@chakra-ui/icons";
import { error } from "console";

interface ProductListProps {
  product: Product;
  index: number;
}

const ProductListComponent: React.FC<ProductListProps> = ({
  product,
  index,
}) => {
  const deleteProductApi = useDeleteProductApi();

  const handleDeleteProduct = () => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      if (product?.id) {
        deleteProductApi.mutate(product?.id, {
          onSuccess: () => {
            window.alert("Product deleted");
          },
          onError: (error: any) => {
            window.alert(error.message);
          },
        });
      }
    }
  };

  return (
    <Tr>
      <Td>{index + 1}</Td>
      <Td>
        <Box overflow={"hidden"} pt={"100%"} position={"relative"} backgroundColor={'gray.100'}>
          <Image
            src={product?.media[0].url || ""}
            position={"absolute"}
            inset={"0"}
            objectFit={'cover'}
            w={'full'}
            h={'full'}
          />
        </Box>
      </Td>
      <Td>{limitText(product?.title, 50) || ""}</Td>
      <Td>{limitText(product?.description, 50) || ""}</Td>
      <Td isNumeric>{product?.price || 0}</Td>
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
      <Td>
        <Box cursor={"pointer"} onClick={() => handleDeleteProduct()}>
          <DeleteIcon color={"red.400"} />
        </Box>
      </Td>
    </Tr>
  );
};

export default withLoadingIndicator(ProductListComponent);
