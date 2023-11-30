export interface OrderItemProps {
  id: number;
  description: string;
  price: number;
  thumbnails: string[];
}

export interface ReviewProps {
  id: number;
  score: number;
  username: string;
  content: string;
  img1Src?: string;
  img2Src?: string;
  img3Src?: string;
  img4Src?: string;
}

export interface ReviewItemProps {
  createdAt: number[];
  orderCode: string;
  orderId: number;
  orderItems: OrderItemProps[];
  review: ReviewProps;
}
