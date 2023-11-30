import styled from 'styled-components';
import { Text } from '../common';
import { totalCategories } from '../../constants/categories';
import useMediaFont from '../../hooks/useMediaFont';
import { useNavigate } from 'react-router-dom';
import { SearchMordalProps } from '../modal/SearchModal';

const TopSearchedList = ({ setModalOpen }: SearchMordalProps) => {
  const navigate = useNavigate();
  const searchFontType = useMediaFont({ desktop: 'Body02', tablet: 'Body02', mobile: 'Body05' });

  const getRandomCategories = (count: number) => {
    const shuffledCategories = totalCategories.sort(() => 0.5 - Math.random());
    const randomCategories = shuffledCategories.slice(0, count).map((category) => category.name);
    return randomCategories;
  };
  const topSearchedKeywords = getRandomCategories(5);

  const handleTopSearchedClick = (keyword: string) => {
    navigate(`/search?keyword=${encodeURIComponent(keyword)}`);
    setModalOpen(false);
  };

  return (
    <TopSearchedWrapper>
      {topSearchedKeywords.map((keyword, index) => (
        <div key={index} onClick={() => handleTopSearchedClick(keyword)}>
          <SearchText $fontType={searchFontType} color="grey20">
            {keyword}
          </SearchText>
        </div>
      ))}
    </TopSearchedWrapper>
  );
};
export default TopSearchedList;

const TopSearchedWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;

  @media screen and (min-width: 768px) {
    gap: 11px 23px;
  }
  @media screen and (max-width: 479px) {
    gap: 11px 13px;
  }
`;

const SearchText = styled(Text)`
  cursor: pointer;
`;
