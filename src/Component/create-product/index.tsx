import React, { useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import { Select as SelectMulti } from "chakra-react-select";
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input,
  Select,
  VStack,
} from "@chakra-ui/react";
import { Controller, useForm } from "react-hook-form";
import { Product, Product_type } from "../../Stores/Api/Types/type";
import useTypeApi from "../../Hooks/useTypeData";
import { useTagApi } from "../../Hooks/useTagData";
import { useCreateProductApi } from "../../Hooks/useProductData";
import QuillEditor from "../Editor";
import ImageUploader from "../ImageUploader";
import Loading from "../loading";

const CreateProduct: React.FC = () => {
  const {
    handleSubmit,
    control,
    register,
    setValue,
    reset,
    formState: { errors, isValid },
  } = useForm<Product>();
  const {
    data: tagList,
    isLoading: loadingTags,
    isError: errorTags,
    error: errMessTags,
  } = useTagApi();
  const {
    data: typeList,
    isLoading: loadingType,
    isError: errorType,
    error: errMessType,
  } = useTypeApi();

  const createProductMutation = useCreateProductApi();

  const handleProductTypeChange = (value: string) => {
    const selectedType = typeList?.find((type) => type.value === value);

    if (selectedType) {
      const newType: Product_type = {
        value: selectedType.value,
        label: selectedType.label,
      };
      console.log("Selected Type: ", newType);
      return setValue("product_type", newType);
    } else {
      return setValue("product_type", null);
    }
  };

  const onSubmit = (values: Product) => {
    const newProduct = {
      title: values.title,
      description: values.description,
      price: values.price,
      media: values.media,
      tags: values.tags || [],
      product_type: values.product_type || null,
    };

    createProductMutation.mutate(newProduct, {
      onSuccess: () => {
        reset();
        window.alert("Product added successfully");
      },
    });
  };

  return (
    <Box>
      <Heading mb={10}>Add Product</Heading>

      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <VStack spacing={4}>
          <Flex w={"full"} gap={"16px"} flexWrap={"wrap"}>
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
            <VStack w={{ base: "full", lg: "400px" }} spacing={4}>
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

                <Controller
                  control={control}
                  name="product_type"
                  render={({ field }) => (
                    <Select
                      placeholder="Select type"
                      onChange={(e) => {
                        field.onChange(e);
                        handleProductTypeChange(e.target.value);
                      }}
                    >
                      {typeList?.map((type) => (
                        <option value={type.value}>{type.label}</option>
                      ))}
                    </Select>
                  )}
                />
              </FormControl>
              <Box w={"full"}>
                <FormLabel>Tags</FormLabel>

                <Controller
                  control={control}
                  {...register("tags")}
                  render={({ field: { onChange, value } }) => (
                    <SelectMulti
                      isMulti
                      name="tags"
                      options={tagList}
                      placeholder="Select tags"
                      closeMenuOnSelect={false}
                      onChange={(val) => onChange(val)}
                    />
                  )}
                />
              </Box>
            </VStack>
          </Flex>

          {createProductMutation.isLoading && (
            <Box mb={4}>
              <Loading></Loading>
            </Box>
          )}
          <Button w={"320px"} type="submit">
            Add
          </Button>
        </VStack>
      </form>
    </Box>
  );
};

export default CreateProduct;
