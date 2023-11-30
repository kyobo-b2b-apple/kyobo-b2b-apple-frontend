import { SetStateAction, Dispatch } from 'react';

export interface FilterItem {
  name: string;
}

export interface FilterBarProps {
  filters: FilterItem[];
  filterValue: string;
  setFilterValue: Dispatch<SetStateAction<string>>;
}
