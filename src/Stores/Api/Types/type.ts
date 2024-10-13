export interface Media {
  url: string;
  alt: string;
}

export interface Product {
  id?: string;
  title: string;
  description: string;
  price: number;
  media: Media[];
  tags: [];
  product_type: Product_type | null;
}

export interface ProductsState {
  products: Product[];
  loading: boolean;
  error: null;
}

export interface Tag {
  value: string;
  label: string;
}

export interface TagsState {
  tags: Tag[];
  loading: boolean;
  error: null;
}

export interface Product_type {
  value: string;
  label: string;
}

export interface ProductTypeState {
  product_type: Product_type[];
  loading: boolean;
  error: null;
}
