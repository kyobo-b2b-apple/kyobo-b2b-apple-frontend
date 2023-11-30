import { Dispatch, SetStateAction } from 'react';
import styled from 'styled-components';
import { useIsOS, OS } from '../../../hooks/useIsOS';
import PriceAndCount from '../inCard/PriceAndCount';
import ProductNameText from '../inCard/ProductNameText';
import OptionText from '../inCard/OptionText';
import Card from '../inCard/Card';
import CardButton from '../inCard/CardButton';
import CardTitle from '../inCard/CardTitle';
import CardContent from '../inCard/CardContent';
import LeftContentImage from '../inCard/LeftContentImage';
import RightContent from '../inCard/RightContent';
import { CheckBoxBtn } from '../../common/CheckBoxBtn';
import WishDeleteIcon from '../inCard/WishDeleteIcon';
import { useNavigate } from 'react-router-dom';
import { BookmarkProductProps } from '../../../interfaces/bookmarkItemProps';
import { AddBookmarkToCart, DeleteBookmarks } from '../../../api/bookMarkApi';

interface WishCardProps {
  id: number;
  item: BookmarkProductProps;
  checkItems: Set<number>;
  setCheckItems: Dispatch<SetStateAction<Set<number>>>;
}

const WishCard = ({ id, item, checkItems, setCheckItems }: WishCardProps) => {
  const isMobile = useIsOS(OS.MOBILE);
  const navigate = useNavigate();

  const setOptionText = () => {
    let optionText = '';
    if (item.acpOption) {
      optionText += item.acpOption + ' / ';
    }
    if (item.accOption1) {
      optionText += item.accOption1 + ' / ';
    }
    if (item.accOption2) {
      optionText += item.accOption2;
    }
    return optionText;
  };

  const handleOnChange = () => {
    const updatedCheckItems = new Set(checkItems);
    if (updatedCheckItems.has(id)) {
      updatedCheckItems.delete(id);
    } else {
      updatedCheckItems.add(id);
    }
    setCheckItems(updatedCheckItems);
  };

  const handleWishDelete = async (id: number) => {
    if (confirm('선택하신 1개 상품을 삭제하시겠습니까?')) {
      try {
        const list = [id];
        const response = await DeleteBookmarks(list);
        alert('삭제되었습니다.');
        window.location.reload();
      } catch (error) {
        console.error(error);
      }
    }
  };

  const handleAddToCart = async (id: number) => {
    try {
      const list = [id];
      const response = await AddBookmarkToCart(list);
    } catch (error) {
      console.error(error);
    }
    if (confirm('해당 상품이 장바구니에 담겼습니다.\n장바구니로 이동하시겠습니까?')) {
      navigate('/cart');
    } else {
      window.location.reload();
    }
  };

  return (
    <Card>
      <CardTitle>
        <CheckBox checked={checkItems.has(id)} onChange={handleOnChange} />
        <WishDeleteIcon onClick={() => handleWishDelete(id)} />
      </CardTitle>
      <CardContent>
        <LeftContentImage src={item.thumbnails[0]} />
        <RightContent>
          <ProductNameText productName={item.description} />
          <PriceAndCount price={item.price} count={1} />
          <OptionText text={setOptionText()} />
          {!isMobile && <CardButton onClick={() => handleAddToCart(id)}>장바구니 담기</CardButton>}
        </RightContent>
      </CardContent>
      {isMobile && <CardButton onClick={() => handleAddToCart(id)}>장바구니 담기</CardButton>}
    </Card>
  );
};
export default WishCard;

const CheckBox = styled(CheckBoxBtn)`
  margin-right: auto;
`;
