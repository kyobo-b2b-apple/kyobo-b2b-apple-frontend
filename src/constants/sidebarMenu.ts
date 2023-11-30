type Menu = {
  name: string;
  path: string;
};

export type SideBarCategory = {
  categoryName: string;
  menus: Menu[];
};

export const SIDEBARMENU: SideBarCategory[] = [
  {
    categoryName: '쇼핑정보',
    menus: [
      { name: '주문목록/배송조회', path: '/my-page/order-list' },
      { name: '취소/반품/교환/환불내역', path: '/my-page/refund-history' },
      { name: '찜 리스트', path: '/my-page/wish-list' },
    ],
  },
  {
    categoryName: '혜택관리',
    menus: [{ name: '쿠폰', path: '/my-page/coupon' }],
  },
  {
    categoryName: 'MY 정보',
    menus: [
      { name: '내 정보 변경', path: '/my-Page/userChange' },
      { name: '배송지 관리', path: '/my-Page/delivery-placelist' },
    ],
  },
  {
    categoryName: 'MY 활동',
    menus: [
      { name: '나의 상품 문의', path: '/my-page/product-inquiry' },
      { name: '나의 상품 후기', path: '/my-page/product-review' },
    ],
  },
];
