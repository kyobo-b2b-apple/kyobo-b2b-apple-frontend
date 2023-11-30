//Todo 답변 기능 만들어지면 답변 기능에 따른 수정 및 전체적인 수정 필요, Window알림 메시지 추후 모달로 수정

import styled from 'styled-components';
import { Spacer, Text } from '../../common';
import CommonButton, { ButtonType } from '../../common/Button';
import React, { useCallback, useEffect, useState } from 'react';
import InquiryModal from '../InquiryModal';
import PostedInquiryDetail from './PostedInquiryDetail';
import FixDeleteBtn from '../FixDeleteBtn';
import { Pagination } from '../../common';
import { deleteInquiry, getProductInquiry, postInquiry, putInquiry } from '../../../api/productInquiryApi';

interface InquiryData {
  id: number;
  inquiry: string;
  authorId?: any;
  author?: string;
  date?: string;
}

const INQUIRYS_PER_PAGE = 5;

const ProductInquiryMain: React.FC<{ productId }> = ({ productId }) => {
  const [isOpenInquiry, isSetOpenInquiry] = useState(false);
  const [isOpenInquiryModal, isSetOpenInquiryModal] = useState(false);
  const [inquiryDataList, setInquiryDataList] = useState<InquiryData[]>([]);
  const [editMode, setEditMode] = useState(false);
  const [selectedInquiry, setSelectedInquiry] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [SelectedInquiryId, setSelectedInquiryId] = useState<number | null>(null);
  const [totalPages, setTotalPages] = useState(5);
  const [openInquiryIndex, setOpenInquiryIndex] = useState(-1);
  const [reply, setReply] = useState(false);

  const indexOfLastInquiry = currentPage * INQUIRYS_PER_PAGE;
  const indexOfFirstInquiry = indexOfLastInquiry - INQUIRYS_PER_PAGE;
  const currentInquirys = inquiryDataList.slice(indexOfFirstInquiry, indexOfLastInquiry);

  const handleSubmit = async (inquiry: string) => {
    if (editMode && SelectedInquiryId !== null) {
      try {
        const response = await putInquiry(SelectedInquiryId, inquiry, true);

        if (!response || !response.isSuccess) {
          console.error('갱신 실패', response?.message);
          return;
        }

        setEditMode(false);
        closeInquiryModal();
      } catch (error) {
        console.error('수정 실패', error);
      }
    } else {
      try {
        const response = await postInquiry(inquiry, false, productId);

        if (!response || !response.isSuccess) {
          console.error('등록 실패', response?.message);
          return;
        }

        closeInquiryModal();
      } catch (error) {
        console.error('등록 실패', error);
      }
    }

    await fetchData();
  };
  const fetchData = useCallback(async () => {
    const inquiriesResult = await getProductInquiry(productId, currentPage, INQUIRYS_PER_PAGE);
    setInquiryDataList(
      inquiriesResult.content.map((item) => {
        const dateArray = item.createdAt;
        const formattedDate = `${dateArray[0].toString().substr(-2)}.${('0' + dateArray[1]).slice(-2)}.${(
          '0' + dateArray[2]
        ).slice(-2)}`;

        return {
          id: item.id,
          inquiry: item.content,
          authorId: item.username,
          author: item.username,
          date: formattedDate,
        };
      }),
    );
    return inquiriesResult.totalPages;
  }, [productId, currentPage]);
  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleOpen = (children: string, index: number) => {
    if (index >= currentInquirys.length || index < 0) {
      console.error('Invalid index:', index);
      return;
    }

    if (isOpenInquiry && openInquiryIndex === index) {
      isSetOpenInquiry(false);
    } else {
      if (!isOpenInquiry) {
        isSetOpenInquiry(true);
      }
    }

    setSelectedInquiry(children);
    setOpenInquiryIndex(index);
  };

  const openInquiryModal = () => {
    isSetOpenInquiryModal(true);
  };
  const closeInquiryModal = () => {
    isSetOpenInquiryModal(false);
    setEditMode(false);
    setSelectedInquiryId(null);
  };
  const handleEdit = async (index: number) => {
    const currentInquiryData = inquiryDataList[index];
    setSelectedInquiryId(inquiryDataList[index].id);
    setSelectedInquiry(currentInquiryData.inquiry);

    setEditMode(true);
    openInquiryModal();
  };
  const handleDelete = async (index: number) => {
    console.log(inquiryDataList);
    const confirmDelete = window.confirm('문의를 삭제 시 복구 및 재작성이 불가합니다. 정말 삭제하시겠습니까?');
    if (confirmDelete) {
      const deleted = await deleteInquiry(inquiryDataList[index].id);
      if (deleted && deleted.isSuccess) {
        const newTotalPages = await fetchData();
        setTotalPages(newTotalPages);
        if (currentPage > newTotalPages) {
          setCurrentPage(newTotalPages);
        } else {
          handlePageClick(currentPage);
        }

        window.alert('삭제가 완료되었습니다.');
      } else {
        console.error('삭제실패', deleted?.message);
      }
    }
  };
  const handlePageClick = (page: number) => {
    setCurrentPage(page);
  };

  const temporaryBtn = () => {
    setReply(!reply);
  };

  return (
    <ProductInquiryMainContainer>
      <InquiryTitleWrap>
        <Text $fontType="H0" color="white">
          상품문의
        </Text>
        <CommonButton onClick={openInquiryModal} type={ButtonType.Primary} width={'76px'} height={'35px'}>
          <InquiryUpload $fontType="Body05" color="white">
            문의하기
          </InquiryUpload>
        </CommonButton>
      </InquiryTitleWrap>
      {isOpenInquiryModal && (
        <InquiryModal
          editMode={editMode}
          productId={productId}
          initialInquiry={editMode ? selectedInquiry : ''}
          onSubmitInquiry={handleSubmit}
          onClose={() => {
            setEditMode(false);
            closeInquiryModal();
          }}
        />
      )}
      <Underline />
      {inquiryDataList.map((inquiryData, index) => (
        <>
          <PostedInquiryContainer key={index}>
            {reply ? (
              <CommonButton type={ButtonType.Ghost} onClick={temporaryBtn} width={'70px'} height={'31px'}>
                <ReplyTxt $fontType="Body04" color="blue10">
                  답변완료
                </ReplyTxt>
              </CommonButton>
            ) : (
              <CommonButton onClick={temporaryBtn} type={ButtonType.Secondary} width={'70px'} height={'31px'}>
                <ReplyTxt $fontType="Body04" color="white">
                  답변대기
                </ReplyTxt>
              </CommonButton>
            )}
            <PostedInquiryWrap onClick={() => handleOpen(inquiryData.inquiry, index)}>
              <Text $fontType="Body04" color="grey30">
                {inquiryData.author &&
                  (inquiryData.author.length > 2 ? `${inquiryData.author.substring(0, 2)}**` : inquiryData.author)}
              </Text>
              <Text $fontType="Body04" color="grey30">
                {inquiryData.date}
              </Text>
              <FixDeleteBtn onEdit={() => handleEdit(index)} onDelete={() => void handleDelete(index)} />
            </PostedInquiryWrap>
            <Text $fontType="Body04" color="white">
              Q . {inquiryData.inquiry.length > 50 ? inquiryData.inquiry.slice(0, 50) + '....' : inquiryData.inquiry}
            </Text>
            <Spacer height={'6px'} />
            <Underline />
          </PostedInquiryContainer>
          {isOpenInquiry && openInquiryIndex === index && currentInquirys[openInquiryIndex] && (
            <PostedInquiryDetail authorId={currentInquirys[openInquiryIndex]?.authorId} key={openInquiryIndex}>
              {currentInquirys[openInquiryIndex]?.inquiry}
            </PostedInquiryDetail>
          )}
        </>
      ))}
      <Pagination totalPages={totalPages} currentPage={currentPage} setCurrentPage={setCurrentPage} />
    </ProductInquiryMainContainer>
  );
};

const ProductInquiryMainContainer = styled.div`
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  gap: 29px;
  position: relative;
`;
const InquiryTitleWrap = styled.div`
  display: flex;
  justify-content: space-between;
`;
const InquiryUpload = styled(Text)`
  white-space: nowrap;
`;
const Underline = styled.div`
  border: 1px solid #545454;
  width: 100%;
`;
const PostedInquiryContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;
const PostedInquiryWrap = styled.div`
  display: flex;
  gap: 11px;
`;

const ReplyTxt = styled(Text)`
  white-space: nowrap;
`;

export default ProductInquiryMain;
