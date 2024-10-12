import {
  Box,
  Flex,
  Image,
  Table,
  TableContainer,
  Tbody,
  Td,
  Tfoot,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { useProductData } from "../Hooks/useProductData";
import { Product } from "../Stores/Api/Types/type";
import limitText from "../Utils/limitText";

const ProductList: React.FC = () => {
  const { data: products, isLoading, isError, error } = useProductData();
  console.log(products);

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error: {error?.message}</p>;
  return (
    <TableContainer>
      <Table size="sm">
        <Thead>
          <Tr>
            <Th w={"40px"}>#</Th>
            <Th w={"80px"}>Images</Th>
            <Th>Title</Th>
            <Th w={'30%'}>Description</Th>
            <Th isNumeric>Price</Th>
            <Th>Type</Th>
            <Th>Tag</Th>
          </Tr>
        </Thead>
        <Tbody>
          {products?.map((product: Product, index: number) => {
            return (
              <Tr>
                <Td>{index + 1}</Td>
                <Td>
                  <Image src={product?.media[0].url} alt="Dan Abramov" />
                </Td>
                <Td>{limitText(product?.title, 50)}</Td>
                <Td>{limitText(product?.description, 50)}</Td>
                <Td isNumeric>{product?.price}</Td>
                <Td>{product?.product_type}</Td>
                <Td>
                  <Flex flexWrap={'wrap'} gap={'2px'}>
                    {product?.tags?.map((tag: any) => (
                      <Box
                        as="span"
                        fontSize={'12px'}
                        backgroundColor={"gray.200"}
                        p={"1px 2px"}
                        borderRadius={"2px"}
                      >
                       {limitText(tag, 6)}
                      </Box>
                    ))}
                  </Flex>
                </Td>
              </Tr>
            );
          })}
        </Tbody>
      </Table>
    </TableContainer>
  );
};

export default ProductList;
