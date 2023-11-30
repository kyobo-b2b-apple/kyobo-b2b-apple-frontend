import { SetStateAction, Dispatch } from 'react';

export interface CategoryItem {
  name: string;
}

export interface CategoryBarProps {
  categories: CategoryItem[];
  categoryValue: string;
  largeCategory?: string;
  setCategoryValue: Dispatch<SetStateAction<string>>;
}
