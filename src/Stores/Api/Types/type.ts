export interface Media {
  url: string;
  alt: string;
}

export interface Product {
  id: string;
  title: string;
  description: string;
  price: number;
  media: Media[];
  tags: [];
  product_type: string;
}
