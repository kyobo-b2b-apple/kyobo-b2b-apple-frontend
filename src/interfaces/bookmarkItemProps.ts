export interface BookmarkProductProps {
  accOption1: string;
  accOption2: string;
  acpOption: string;
  description: string;
  id: number;
  price: number;
  smallCategory: string;
  thumbnails: string[];
}

export interface BookmarkItemProps {
  id: number;
  product: BookmarkProductProps;
}
