import { useState, useEffect, useCallback } from 'react';
import CategoryBar from '../../components/category/CategoryBar';
import { CategoryItem } from '../../interfaces/categoryProps';
import {
  macCategories,
  ipadCategories,
  iphoneCategories,
  watchCategories,
  accCategories,
  etcCategories,
} from '../../constants/categories';
import { productFilters } from '../../constants/filters';
import { useLocation } from 'react-router-dom';
import ContentsLayout from '../../layout/contentsWidthLayout';
import { Spacer, FilterBar, FilterBarMobile, Pagination, MediaLayout } from '../../components/common';
import ItemList from '../../components/ItemList';
import useMediaPX from '../../hooks/useMediaPX';
import { getProductList } from '../../api/productListApi';
import { ProductListProps } from '../../api/productListApi';
import ItemProps from '../../interfaces/itemProps';
import { getEventList } from '../../api/eventApi';
import ImageSlider from '../../components/ImageSlider';
import NewImageSlider from '../../components/NewImgaeSlider';

const CategoryPage = () => {
  const location = useLocation();
  const [categories, setCategories] = useState<CategoryItem[]>([]);
  const [filterValue, setFilterValue] = useState('추천순');
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [items, setItems] = useState<ItemProps[]>([]);
  const itemsPerPage = 12;
  const [largeCategory, setLargeCategory] = useState('');
  const [smallCategory, setSmallCategory] = useState('전체');
  const [sortBy, setSortBy] = useState('popularity');
  const [eventItems, setEventItems] = useState([]);

  const topSpace = useMediaPX({ desktop: 36, tablet: 14, mobile: 13 });
  const categorySpace = useMediaPX({ desktop: 16, tablet: 14, mobile: 13 });
  const filterSpace = useMediaPX({ desktop: 32, tablet: 14, mobile: 17 });
  const itemSpace = useMediaPX({ desktop: 81, tablet: 83, mobile: 55 });
  const pageSpace = useMediaPX({ desktop: 233, tablet: 83, mobile: 98 });

  const landingImages = [
    'https://yong-server.s3.ap-northeast-2.amazonaws.com/%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA+2023-09-05+%E1%84%8B%E1%85%A9%E1%84%92%E1%85%AE+7.58.10.png',
    'https://yong-server.s3.ap-northeast-2.amazonaws.com/%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA+2023-09-05+%E1%84%8B%E1%85%A9%E1%84%92%E1%85%AE+7.58.25.png',
    'https://yong-server.s3.ap-northeast-2.amazonaws.com/banner.png',
  ];

  const getData = useCallback(async (productListProps: ProductListProps) => {
    const result = await getProductList(productListProps);
    setItems(result.data.result.content);
    setTotalPages(result.data.result.totalPages);
  }, []);

  useEffect(() => {
    const productListProps = {
      page: currentPage,
      size: itemsPerPage,
      largeCategory: largeCategory,
      smallCategory: smallCategory === '전체' ? null : smallCategory,
      sortBy: sortBy,
    };
    if (largeCategory) {
      getData(productListProps);
    }
  }, [largeCategory, smallCategory, currentPage, sortBy, getData]);

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const largeCategoryParams = queryParams.get('large_category');
    const smallCategoryParams = queryParams.get('small_category');
    setLargeCategory(largeCategoryParams || '');
    setSmallCategory(smallCategoryParams || '전체');
  }, [location.search]);

  useEffect(() => {
    switch (largeCategory) {
      case 'Mac':
        setCategories(macCategories);
        break;
      case 'iPad':
        setCategories(ipadCategories);
        break;
      case 'iPhone':
        setCategories(iphoneCategories);
        break;
      case 'Watch':
        setCategories(watchCategories);
        break;
      case 'ACC':
        setCategories(accCategories);
        break;
      case 'ETC':
        setCategories(etcCategories);
        break;
    }
  }, [largeCategory]);

  useEffect(() => {
    const filterItem = productFilters.find((item) => item.name === filterValue);
    setSortBy(filterItem?.value || 'popularity');
    setCurrentPage(1);
  }, [filterValue]);

  useEffect(() => {
    setFilterValue('추천순');
    setCurrentPage(1);
  }, [largeCategory, smallCategory]);

  useEffect(() => {
    async function fetchEventList() {
      try {
        const result = await getEventList(1, 5, false);
        setEventItems(result.data.result.content);
      } catch (error) {
        console.error(error);
      }
    }
    fetchEventList();
  }, []);

  return (
    <ContentsLayout $type="full">
      <NewImageSlider images={landingImages} />
      <ContentsLayout $type="responsive">
        <Spacer height={topSpace} />
        <CategoryBar
          categories={categories}
          categoryValue={smallCategory}
          setCategoryValue={setSmallCategory}
          largeCategory={largeCategory}
        />
        <Spacer height={categorySpace} />

        <MediaLayout
          DesktopComponent={
            <FilterBar filters={productFilters} filterValue={filterValue} setFilterValue={setFilterValue} />
          }
          TabletComponent={
            <FilterBar filters={productFilters} filterValue={filterValue} setFilterValue={setFilterValue} />
          }
          MobileComponent={
            <FilterBarMobile filters={productFilters} filterValue={filterValue} setFilterValue={setFilterValue} />
          }
        />
        <Spacer height={filterSpace} />

        <ItemList type="category" label="상품 리스트" items={items} />
        <Spacer height={itemSpace} />

        <Pagination totalPages={totalPages} currentPage={currentPage} setCurrentPage={setCurrentPage} />
        <Spacer height={pageSpace} />
      </ContentsLayout>
    </ContentsLayout>
  );
};
export default CategoryPage;
