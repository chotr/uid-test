import React, { useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import { createProduct } from "../Stores/Api/productApi";
import { Product } from "../Stores/Api/Types/type";
import { Select as SelectMulti } from "chakra-react-select";
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Select,
  Text,
  VStack,
} from "@chakra-ui/react";
import QuillEditor from "../Component/Editor";
import ImageUploader from "../Component/ImageUploader";
import { useForm } from "react-hook-form";

const colorOptions = [
  { value: "blue", label: "Blue" },
  { value: "purple", label: "Purple" },
  { value: "red", label: "Red" },
  { value: "orange", label: "Orange" },
  { value: "yellow", label: "Yellow" },
  { value: "green", label: "Green" },
];

type ProductFormValues = {
  title: string;
  description: string;
  price: number;
};

const CreateProduct: React.FC = () => {
  const [productName, setProductName] = useState<string>("");
  const [productPrice, setProductPrice] = useState<number | "">("");
  const queryClient = useQueryClient();
  const [isSubmitted, setIsSubmitted] = useState(true);
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<ProductFormValues>();

  const mutation = useMutation(createProduct, {
    onSuccess: () => {
      queryClient.invalidateQueries("products");
    },
  });

  function validateName(value: any) {
    let error;
    if (!value) {
      error = "Name is required";
    } else if (value.toLowerCase() !== "naruto") {
      error = "Jeez! You're not a fan 😱";
    }
    return error;
  }

  const onSubmit = (values: ProductFormValues) => {
    setIsSubmitted(false);
    if (productName && productPrice) {
      //   const newProduct: Product = {
      // id: Math.random().toString(36).substr(2, 9),
      // name: productName,
      // price: Number(productPrice),
      //   };
      //   mutation.mutate(newProduct);
    }
  };

  return (
    <div>
      <Text mb={"16px"}>Add Product</Text>
      <form onSubmit={handleSubmit(onSubmit)}>
        <VStack spacing={4}>
          <Flex w={"full"} gap={"16px"}>
            <VStack flex={"1"} spacing={4}>
              <FormControl
                isRequired
                isInvalid={isSubmitted && productName === ""}
                w={"full"}
              >
                <FormLabel>Name</FormLabel>
                <Input
                  type="text"
                  value={productName}
                  // onChange={(e) => setProductName(e.target.value)}
                  placeholder="Product Name"
                  {...register("title", {
                    required: "rggergregerg",
                  })}
                />

                {productName === "" && (
                  <FormErrorMessage>Email is required.</FormErrorMessage>
                )}
              </FormControl>
              <Box w={"full"}>
                <FormLabel>Description</FormLabel>
                <QuillEditor></QuillEditor>
              </Box>
              <Box w={"full"}>
                <FormLabel>Media</FormLabel>
                <ImageUploader></ImageUploader>
              </Box>
            </VStack>
            <VStack w={"320px"} spacing={4}>
              <Box w={"full"}>
                <FormLabel>Price</FormLabel>
                <Input
                  type="text"
                  //   value={productName}
                  onChange={(e) => setProductName(e.target.value)}
                  placeholder="Enter price"
                  required
                />
              </Box>
              <Box w={"full"}>
                <FormLabel>Product type</FormLabel>
                <Select placeholder="Select type">
                  <option value="option1">Option 1</option>
                  <option value="option2">Option 2</option>
                  <option value="option3">Option 3</option>
                </Select>
              </Box>
              <Box w={"full"}>
                <FormLabel>Tags</FormLabel>
                <SelectMulti
                  isMulti
                  name="colors"
                  options={colorOptions}
                  placeholder="Select tags"
                  closeMenuOnSelect={false}
                />
              </Box>
            </VStack>
          </Flex>
          <Button ml={"auto"} w={"320px"} type="submit">
            Add
          </Button>
        </VStack>
      </form>
    </div>
  );
};

export default CreateProduct;
