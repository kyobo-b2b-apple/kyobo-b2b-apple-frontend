export interface ProductProps {
  id: number;
  description: string;
  thumbnails: string[];
}

export interface InquiryItemProps {
  content: string;
  createdAt: number[];
  id: number;
  inquiryStatus: string;
  product: ProductProps;
}
