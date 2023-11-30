import { useState, useEffect, useCallback } from 'react';
import { Pagination } from '../../../components/common';
import CardList from '../../../components/my/CardList';
import MyContainer from '../../../components/my/MyContainer';
import TotalSelectBox from '../../../components/my/TotalSelectBox';
import WishCard from '../../../components/my/cards/WishCard';
import { getBookmark, BookmarkProps } from '../../../api/bookMarkApi';
import { BookmarkItemProps } from '../../../interfaces/bookmarkItemProps';

const WishList = () => {
  const [totalPages, setTotalPages] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);
  const [checkItems, setCheckItems] = useState(new Set<number>());
  const itemsPerPage = 5;
  const [bookmarks, setBookmarks] = useState<BookmarkItemProps[]>([]);
  const [allChecked, setAllChecked] = useState(false);

  const handleAllChecked = ({ target: { checked } }) => {
    setAllChecked(!allChecked);
    if (checked) {
      const allChecked = new Set(bookmarks.map(({ id }) => id));
      setCheckItems(allChecked);
    } else {
      setCheckItems(new Set());
    }
  };

  useEffect(() => {
    if (checkItems.size !== 0 && checkItems.size === bookmarks.length) {
      setAllChecked(true);
    } else {
      setAllChecked(false);
    }
  }, [checkItems, bookmarks]);

  const getData = useCallback(async (bookmarkProps: BookmarkProps) => {
    const result = await getBookmark(bookmarkProps);
    setTotalPages(result.data.result.totalPages);
    setBookmarks(result.data.result.content);
  }, []);

  useEffect(() => {
    const bookmarkProps: BookmarkProps = {
      page: currentPage,
      size: itemsPerPage,
    };
    getData(bookmarkProps);
  }, [currentPage, getData]);

  return (
    <MyContainer label="찜 리스트">
      <TotalSelectBox onChange={handleAllChecked} checked={allChecked} checkItems={checkItems} />
      <CardList>
        {bookmarks.map((item) => (
          <WishCard
            key={item.id}
            id={item.id}
            item={item.product}
            checkItems={checkItems}
            setCheckItems={setCheckItems}
          />
        ))}
      </CardList>
      <Pagination totalPages={totalPages} currentPage={currentPage} setCurrentPage={setCurrentPage} />
    </MyContainer>
  );
};
export default WishList;
