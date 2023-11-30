export interface Product {
  id: number;
  thumbnails: string[];
  smallCategory: string;
  description: string;
  price: number;
  acpOption?: string;
  accOption1?: string;
  accOption2?: string;
  accOption3?: string;
  accOption4?: string;
}

export interface DataRow {
  id: number;
  product: Product;
  quantity?: number;
  acpEmail?: string;
  acpName?: string;
  acpOptionQuantity?: number;
  accOption1Quantity?: number;
  accOption2Quantity?: number;
  accOption3Quantity?: number;
  accOption4Quantity?: number;
  totalPrice?: number;
  deliveryFee?: number;
}
