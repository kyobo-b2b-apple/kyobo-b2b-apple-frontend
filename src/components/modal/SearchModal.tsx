import { FC, useEffect, useState, Dispatch, SetStateAction } from 'react';
import styled from 'styled-components';
import { Spacer, Text } from '../common';
import SearchBar from '../search/SearchBar';
import Modal, { ModalType } from './Modal';
import useMediaPX from '../../hooks/useMediaPX';
import TopSearchedList from '../search/TopSearchedList';
import XIcon from '../search/XIcon';
import { XIconType } from '../search/XIcon';

export interface SearchMordalProps {
  modalOpen: boolean;
  setModalOpen: Dispatch<SetStateAction<boolean>>;
}

const SearchModal: FC<SearchMordalProps> = ({ modalOpen, setModalOpen }) => {
  const searchSpace = useMediaPX({ desktop: '21px', tablet: '21px', mobile: '18px' });
  const bottomSpace = useMediaPX({ desktop: '76px', tablet: '76px', mobile: '36px' });
  const [searchTerm, setSearchTerm] = useState('');

  const handleCloseClick = () => {
    setSearchTerm('');
    setModalOpen(false);
  };

  useEffect(() => {
    setSearchTerm('');
  }, [modalOpen]);

  return (
    <Modal type={ModalType.TAB} isModalOpen={modalOpen} onClose={handleCloseClick}>
      <TotalWrapper>
        <CenterWrapper>
          <Spacer height="50px" />
          <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} isModal={true} setModalOpen={setModalOpen} />
          <Spacer height={searchSpace} />

          <Text $fontType="H3" color="white">
            인기 검색어
          </Text>
          <Spacer height="11px" />

          <TopSearchedList modalOpen={modalOpen} setModalOpen={setModalOpen} />
          <Spacer height={bottomSpace} />
        </CenterWrapper>
        <XIcon type={XIconType.CLOSE} onClick={handleCloseClick} />
      </TotalWrapper>
    </Modal>
  );
};

export default SearchModal;

const TotalWrapper = styled.div`
  max-width: 773px;
  background: ${(props) => props.theme.color.black};
  position: relative;

  @media screen and (min-width: 768px) {
    margin: 0 auto;
  }
  @media screen and (max-width: 767px) {
    margin: 0px 20px;
  }
`;

const CenterWrapper = styled.div`
  @media screen and (min-width: 768px) {
    margin-right: 25px;
  }
  @media screen and (max-width: 767px) {
    margin-right: 20px;
  }
  @media screen and (max-width: 479px) {
    margin-right: 5px;
  }
`;
