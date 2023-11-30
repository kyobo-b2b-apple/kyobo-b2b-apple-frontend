import { ChangeEventHandler } from 'react';
import styled from 'styled-components';
import { CheckBoxBtn } from '../common/CheckBoxBtn';
import { Text } from '../common';
import { DeleteBookmarks } from '../../api/bookMarkApi';

interface TotalSelectProps {
  onChange: ChangeEventHandler<HTMLInputElement>;
  checked: boolean;
  checkItems: Set<number>;
}

const TotalSelectBox = ({ onChange, checked, checkItems }: TotalSelectProps) => {
  const handleDeleteClick = async () => {
    const checkItemsCnt = checkItems.size;
    if (confirm(`선택하신 ${checkItemsCnt}개 상품을 삭제하시겠습니까?`)) {
      try {
        const arr = Array.from(checkItems);
        const response = await DeleteBookmarks(arr);
        alert('삭제되었습니다.');
        window.location.reload();
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <BoxWrapper>
      <CheckBoxBtn checked={checked} onChange={onChange} />
      <Text $fontType="Body04" color="white">
        선택상품
      </Text>
      <DeleteWrapper onClick={handleDeleteClick}>
        <DeleteText $fontType="Body05">삭제</DeleteText>
      </DeleteWrapper>
    </BoxWrapper>
  );
};
export default TotalSelectBox;

const BoxWrapper = styled.div`
  display: flex;
  align-items: center;
  border-radius: 8px;
  background: ${(props) => props.theme.color.grey80};
  padding: 12px 14px 11px 14px;
  height: 44px;
  padding-left: 12px;
  gap: 0px 6px;
`;

const DeleteWrapper = styled.div`
  cursor: pointer;
`;

const DeleteText = styled(Text)`
  color: #a3a3a3;
  text-decoration-line: underline;
`;
