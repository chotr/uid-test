import {
  Box,
  Flex,
  Heading,
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
import { Product, Tag } from "../Stores/Api/Types/type";
import { Select as SelectMulti } from "chakra-react-select";
import { Search2Icon } from "@chakra-ui/icons";
import ProductListComponent from "./productListComponent";
import { useTagApi } from "../Hooks/useTagData";
import { useEffect, useState } from "react";

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
  const {
    data: tagList,
    isLoading: loadingTags,
    isError: errorTags,
    error: errMessTags,
  } = useTagApi();

  const [productList, setProductList] = useState<Product[]>([]);
  const [productSearchSelected, setProductSearchSelected] = useState<Product[]>(
    []
  );

  const handleChangTag = (e: any) => {
    let productSelected: Product[] = [];
    if (e.length > 0) {
      productSelected =
        products?.filter((p) => {
          return p.tags?.some((productTag: any) =>
            e.some((selectedTag: any) => selectedTag.value === productTag.value)
          );
        }) || [];
      setProductSearchSelected(productSelected);
      setProductList(productSelected);
    } else {
      setProductSearchSelected(products || []);
      setProductList(products || []);
    }
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value !== "") {
      const prFT = productList.filter((p: Product) =>
        p.title.toLowerCase().includes(e.target.value.toLowerCase())
      );
      setProductSearchSelected(prFT);
    } else {
      setProductSearchSelected(productList || []);
    }
  };

  useEffect(() => {
    setProductList(products || []);
    setProductSearchSelected(products || []);
  }, [products]);

  if (isError) return <p>Error: {error?.message}</p>;
  return (
    <VStack>
      <Box w={"full"}>
      <Heading mb={10}>Product List</Heading>

        <Text mb={"12px"}>Search</Text>

        <Flex gap={"16px"}>
          <Box flex={"1"}>
            <InputGroup size="sm">
              <InputLeftAddon height={"40px"}>
                <Search2Icon />
              </InputLeftAddon>
              <Input
                placeholder="Search"
                height={"40px"}
                onChange={(e) => handleSearch(e)}
              />
              {/* <InputRightAddon height={'40px'}>.com</InputRightAddon> */}
            </InputGroup>
          </Box>
          <Box w={"300px"} mb={"16px"}>
            <SelectMulti
              isMulti
              name="colors"
              options={tagList}
              placeholder="Filter tags"
              closeMenuOnSelect={false}
              onChange={(e) => handleChangTag(e)}
            />
          </Box>
        </Flex>
      </Box>

      <Box overflowX={"auto"} maxWidth={"full"} w={"full"}>
        <TableContainer w={"full"} minWidth={"700px"} overflowX={"auto"}>
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
                <Th>{""}</Th>
              </Tr>
            </Thead>
            <Tbody>
              {productSearchSelected?.map((product: Product, index: number) => {
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
      </Box>
    </VStack>
  );
};

export default ProductList;
