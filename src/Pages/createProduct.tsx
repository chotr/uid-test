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
import { Controller, useForm } from "react-hook-form";

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
  media: File[];
};

const CreateProduct: React.FC = () => {
  //   const [productName, setProductName] = useState<string>("");
  //   const [productPrice, setProductPrice] = useState<string>("");
  const queryClient = useQueryClient();
  //   const [isSubmitted, setIsSubmitted] = useState(true);
  const {
    handleSubmit,
    control,
    register,
    formState: { errors, isValid },
  } = useForm<ProductFormValues>();

  const mutation = useMutation(createProduct, {
    onSuccess: () => {
      queryClient.invalidateQueries("products");
    },
  });

  const onSubmit = (values: ProductFormValues) => {
    // setIsSubmitted(false);
    console.log("Form submitted successfully!", values);
    // if (productName && productPrice) {
    //   const newProduct: Product = {
    // id: Math.random().toString(36).substr(2, 9),
    // name: productName,
    // price: Number(productPrice),
    //   };
    //   mutation.mutate(newProduct);
    // }
  };

  return (
    <div>
      <Text mb={"16px"}>Add Product</Text>
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <VStack spacing={4}>
          <Flex w={"full"} gap={"16px"}>
            <VStack flex={"1"} spacing={4}>
              <FormControl isRequired isInvalid={!!errors.title} w={"full"}>
                <FormLabel>Name</FormLabel>
                <Input
                  placeholder="Product Name"
                  {...register("title", {
                    required: "This is a required field",
                    validate: {
                      minLength: (value) =>
                        value.length > 8 || "Please enter at least 8 words",
                    },
                  })}
                />

                <FormErrorMessage>{errors.title?.message}</FormErrorMessage>
              </FormControl>
              <FormControl
                w={"full"}
                isRequired
                isInvalid={!!errors.description}
              >
                <FormLabel>Description</FormLabel>
                <Controller
                  control={control}
                  {...register("description", {
                    required: "This is a required field",
                    validate: {
                      minLength: (value) =>
                        value.length > 100 || "Please enter at least 100 words",
                    },
                  })}
                  render={({ field }) => (
                    <QuillEditor
                      value={field.value}
                      onChange={field.onChange}
                    />
                  )}
                />
                <FormErrorMessage>
                  {errors.description?.message}
                </FormErrorMessage>
              </FormControl>
              <FormControl w={"full"} isRequired isInvalid={!!errors.media}>
                <FormLabel>Media</FormLabel>
                <Controller
                  control={control}
                  {...register("media", {
                    required: "This is a required field",
                  })}
                  render={({ field }) => (
                    <ImageUploader
                      value={field.value}
                      onChange={field.onChange}
                    />
                  )}
                />
                <FormErrorMessage>{errors.media?.message}</FormErrorMessage>
              </FormControl>
            </VStack>
            <VStack w={"320px"} spacing={4}>
              <FormControl w={"full"} isRequired isInvalid={!!errors.price}>
                <FormLabel>Price</FormLabel>
                <Input
                  placeholder="Enter price"
                  {...register("price", {
                    required: "This is a required field",
                    validate: {
                      isNumber: (value) =>
                        !isNaN(value) || "Please enter a valid number",
                    },
                  })}
                />
                <FormErrorMessage>{errors.price?.message}</FormErrorMessage>
              </FormControl>
              <FormControl w={"full"}>
                <FormLabel>Product type</FormLabel>
                <Select placeholder="Select type">
                  <option value="option1">Option 1</option>
                  <option value="option2">Option 2</option>
                  <option value="option3">Option 3</option>
                </Select>
              </FormControl>
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
