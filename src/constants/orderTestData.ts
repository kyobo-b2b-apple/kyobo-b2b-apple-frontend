import { OrderProductProps, OrderItemProps } from '../interfaces/orderItemProps';

const exProduct: OrderProductProps = {
  accOption1: 'Magic Mouse - White (+89,000원)',
  accOption2: 'Magic Trackpad - White (+149,000원)',
  accOption3: 'Magic Keyboard Touch ID (+179,000원)',
  accOption4: 'Magic Keyboard Touch ID + Numeric Keypad - White (+209,000원)',
  acpOption: 'AppleCare+ for Mac Studio M2  (자동등록) (+219,000원)',
  description: 'iPad Pro 11 Wi-Fi - Cellular 128GB - Space Gray',
  id: 50,
  price: 5990000,
  smallCategory: 'Mac Studio',
  thumbnails: [
    'https://store.storeimages.cdn-apple.com/8756/as-images.apple.com/is/ipadpro11-digitalmat-gallery-1-202210?wid=728&hei=666&fmt=png-alpha&.v=1664477161220',
  ],
};

//s3 요청 횟수 문제로 우선 빼놓음
/*thumbnails: [
  'https://apple-store-s3-bucket.s3.ap-northeast-2.amazonaws.com/device-thumbnails/iPad/iPadPro11/cell/SpaceGray/iPad_Pro_Cellular_11_in_4th_generation_Space_Gray_PDP_Image_Position-1b__KO-KR_20221011_V1.jpg',
],*/

//reviewId=> 후기 여부 확인을 위해서
//csStatus=> 주문 상태를 확인하기 위해서

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

const exOrderItems: OrderItemProps[] = [
  {
    id: 67,
    product: exProduct,
    quantity: 1,
    totalPrice: 6835000,
  },
  {
    id: 68,
    product: exProduct,
    quantity: 1,
    totalPrice: 1535000,
  },
];

const orderTestData: OrderItemListProps[] = [
  {
    createdAt: [2023, 8, 31, 7, 56, 53],
    deliveryFee: 2500,
    discountAmount: 0,
    discountRate: 0,
    id: 41,
    orderAmount: 9882500,
    orderCode: '2023083141',
    orderItems: exOrderItems,
    orderState: 'PREPARE_PRODUCT',
    productAmount: 9880000,
    updatedAt: [2023, 8, 31, 7, 57, 15],
  },
  {
    createdAt: [2023, 8, 31, 7, 56, 53],
    deliveryFee: 2500,
    discountAmount: 0,
    discountRate: 0,
    id: 42,
    orderAmount: 9882500,
    orderCode: '2023083142',
    orderItems: exOrderItems,
    orderState: 'DELIVERY_START',
    productAmount: 9880000,
    updatedAt: [2023, 8, 31, 7, 57, 15],
  },
];
export default orderTestData;
