export interface OrderItemListProps {
  createdAt: number[];
  deliveryFee: number;
  discountAmount: number;
  discountRate: number;
  id: number;
  orderAmount: number;
  orderCode: string;
  orderItems: OrderItemProps[];
  orderState: string;
  productAmount?: number;
  updatedAt: number[];
}
//reviewId 속성 추가함 : 리뷰 유무에 따른 버튼 텍스트 지정 위해서

export interface OrderItemProps {
  id: number;
  product: OrderProductProps;
  totalPrice: number;
  quantity: number;
}

export interface OrderProductProps {
  accOption1: string;
  accOption2: string;
  accOption3: string;
  accOption4: string;
  acpOption: string;
  description: string;
  id: number;
  price: number;
  smallCategory: string;
  thumbnails: string[];
}

export interface OrderCardProps {
  item: OrderItemProps;
  date: string;
  orderCode: string;
  orderState: string;
}
