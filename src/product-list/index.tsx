import {
  Box,
  Flex,
  Image,
  Input,
  InputGroup,
  InputLeftAddon,
  InputRightAddon,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Tfoot,
  Th,
  Thead,
  Tr,
  VStack,
} from "@chakra-ui/react";
import { useProductApi } from "../Hooks/useProductData";
import { Product } from "../Stores/Api/Types/type";
import { Select as SelectMulti } from "chakra-react-select";
import { Search2Icon } from "@chakra-ui/icons";
import ProductListComponent from "./productListComponent";

const colorOptions = [
  { value: "blue", label: "Blue" },
  { value: "purple", label: "Purple" },
  { value: "red", label: "Red" },
  { value: "orange", label: "Orange" },
  { value: "yellow", label: "Yellow" },
  { value: "green", label: "Green" },
];

const ProductList: React.FC = () => {
  const { data: products, isLoading, isError, error } = useProductApi();

  if (isError) return <p>Error: {error?.message}</p>;
  return (
    <VStack>
      <Box w={"full"}>
        <Text mb={"12px"}>Search</Text>

        <Flex gap={"16px"}>
          <Box flex={"1"}>
            <InputGroup size="sm">
              <InputLeftAddon height={"40px"}>
                <Search2Icon />
              </InputLeftAddon>
              <Input placeholder="Search" height={"40px"} />
              {/* <InputRightAddon height={'40px'}>.com</InputRightAddon> */}
            </InputGroup>
          </Box>
          <Box w={"300px"} mb={"16px"}>
            <SelectMulti
              isMulti
              name="colors"
              options={colorOptions}
              placeholder="Filter tags"
              closeMenuOnSelect={false}
            />
          </Box>
        </Flex>
      </Box>

      <TableContainer w={"full"}>
        <Table size="sm">
          <Thead>
            <Tr>
              <Th w={"40px"}>#</Th>
              <Th w={"80px"}>Images</Th>
              <Th>Title</Th>
              <Th w={"30%"}>Description</Th>
              <Th isNumeric>Price</Th>
              <Th>Type</Th>
              <Th>Tag</Th>
            </Tr>
          </Thead>
          <Tbody>
            {products?.map((product: Product, index: number) => {
              return (
                <ProductListComponent
                  isLoading={isLoading}
                  product={product}
                  index={index}
                />
              );
            })}
          </Tbody>
        </Table>
      </TableContainer>
    </VStack>
  );
};

export default ProductList;
