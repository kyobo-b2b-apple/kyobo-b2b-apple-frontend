export interface ProductFilterItem {
  name: string;
  value: string;
}

export interface EventFilterItem {
  name: string;
}

export const productFilters: ProductFilterItem[] = [
  { name: '추천순', value: 'popularity' },
  { name: '판매인기순', value: 'popularity' },
  { name: '낮은가격순', value: 'low-price' },
  { name: '높은가격순', value: 'high-price' },
  { name: '상품평순', value: 'review' },
  { name: '등록일순', value: 'registration' },
];

export const eventFilters: EventFilterItem[] = [
  { name: '전체' },
  { name: '진행중인 이벤트' },
  { name: '종료된 이벤트' },
];
