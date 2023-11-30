import { styled } from 'styled-components';
import { Pagination, Spacer, Text } from '../../common';
import CommonButton, { ButtonType } from '../../common/Button';
import StarRating from './StarPoint';
import { FC, useEffect, useState } from 'react';
import PostedReviewDetail from './PostedReviewDetail';
import { deleteReview, getReviewsByProductId } from '../../../api/ReviewApi';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store';
import FixDeleteBtn from '../FixDeleteBtn';
import ReviewModal from '../ReviewModal';
import { EditReviewProps, editReview } from '../../../api/myReviewApi';

interface Review {
  id: number;
  score: number;
  username: string;
  content: string;
  img1Src?: string;
  img2Src?: string;
  img3Src?: string;
  img4Src?: string;
}

const Review: FC<{ productId }> = ({ productId }) => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [selectedReviewIndex, setSelectedReviewIndex] = useState<number | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(5);
  const [selectedReview, setSelectedReview] = useState<Review | null>(null);
  const [selectedRating, setSelectedRating] = useState(0);
  const [openReivewModal, setOpenReviewModal] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [selectedReviewText, setSelectedReviewText] = useState('');
  const [selectedImages, setSelectedImages] = useState<string[]>([]);

  const isLoggedIn = useSelector((state: RootState) => state.login.isLoggedIn);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await getReviewsByProductId(productId);
        if (response.status === 200) {
          setReviews(response.data.result.content);
          setTotalPages(response.data.result.totalPages);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchReviews();
  }, [productId]);

  const reviewsPerPage = 5;

  const indexOfLastReview = currentPage * reviewsPerPage;
  const indexOfFirstReview = indexOfLastReview - reviewsPerPage;
  const currentReviews = reviews.slice(indexOfFirstReview, indexOfLastReview);

  const handleReviewClick = (index: number) => {
    setSelectedReviewIndex(index);
  };

  const reviewPost = () => {
    if (!isLoggedIn) {
      alert('로그인 후 이용 가능합니다.');
    } else {
      navigate('/my-page/product-review');
    }
  };
  const handleEdit = (review: Review) => {
    setSelectedReview(review);
    setSelectedRating(review.score);
    setOpenReviewModal(true);
    setSelectedReviewText(review.content);
    setEditMode(true);
    setSelectedImages([review.img1Src, review.img2Src, review.img3Src, review.img4Src].filter(Boolean) as string[]);
  };

  const handleOnSubmit = async (review: string, rating: number, images: File[]) => {
    if (!selectedReview) {
      return;
    }
    try {
      if (editMode) {
        const editData: EditReviewProps = {
          score: rating,
          content: review,
          images: images,
          reviewId: selectedReview.id,
        };
        editReview(editData)
          .then((response) => {
            window.location.reload();
          })
          .catch((error) => {
            console.log('후기 PUT 실패', error);
          });
      } else {
        console.log('');
      }
    } catch (error) {
      alert('리뷰 저장에 실패했습니다. 다시 시도해주세요.');
    }
  };

  const handleDelete = async (reviewId: number) => {
    const confirmDelete = window.confirm('정말로 이 문의를 삭제하시겠습니까?');
    console.log(reviewId);
    if (confirmDelete) {
      try {
        await deleteReview(reviewId);

        setReviews(reviews.filter((review) => review.id !== reviewId));

        alert('리뷰가 성공적으로 삭제되었습니다.');
      } catch (error) {
        alert('리뷰 삭제에 실패했습니다. 다시 시도해주세요.');
      }
    }
  };

  return (
    <ReviewContainer>
      <ReviewTitleWrap>
        <Text $fontType="H0" color="white">
          상품후기
        </Text>
        <CommonButton onClick={reviewPost} type={ButtonType.Primary} width={'76px'} height={'35px'}>
          <ReviewBtn $fontType="Body05" color="white">
            후기쓰기
          </ReviewBtn>
        </CommonButton>
      </ReviewTitleWrap>
      <Underline />
      {reviews.map((reviewData, index) => (
        <>
          <PostedReviewContainer onClick={() => handleReviewClick(index)}>
            <PostedReview>
              <div>
                <PostedReviewInfoWrap>
                  <FixDeleteBtn onEdit={() => handleEdit(reviewData)} onDelete={() => handleDelete(reviewData.id)} />
                  <StarRating rating={reviewData.score} />
                </PostedReviewInfoWrap>
                <Text $fontType="Body04" color="grey30">
                  {reviewData.username.length > 2 ? `${reviewData.username.substring(0, 2)}**` : reviewData.username}
                </Text>
              </div>
              <ImageWrap>
                {[reviewData.img1Src, reviewData.img2Src, reviewData.img3Src, reviewData.img4Src].map(
                  (imgSrc, idx) =>
                    imgSrc && <ReviewImage key={`thumbnail-${idx}`} src={imgSrc} alt={`review-thumbnail-${idx}`} />,
                )}
              </ImageWrap>
            </PostedReview>
            <Text $fontType="Body04" color="white">
              {reviewData.content.length > 50 ? `${reviewData.content.substring(0, 50)}...` : reviewData.content}
            </Text>
          </PostedReviewContainer>
          {openReivewModal && (
            <ReviewModal
              editMode={editMode}
              initialRating={editMode ? selectedRating : 0}
              initialReview={editMode ? selectedReviewText : ''}
              onSubmitReview={handleOnSubmit}
              onClose={() => setOpenReviewModal(false)}
              initialImages={selectedImages}
            />
          )}
          <Spacer height={'6px'} />
          <Underline />
          {selectedReviewIndex !== null && (
            <PostedReviewDetail
              content={reviewData.content}
              rating={reviewData.score}
              author={reviewData.username.length > 2 ? `${reviewData.username.substring(0, 2)}**` : reviewData.username}
              images={
                [reviewData.img1Src, reviewData.img2Src, reviewData.img3Src, reviewData.img4Src].filter(
                  Boolean,
                ) as string[]
              }
            />
          )}
        </>
      ))}
      <Pagination totalPages={totalPages} currentPage={currentPage} setCurrentPage={setCurrentPage} />
    </ReviewContainer>
  );
};

const ReviewContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 24px;
`;
const ReviewTitleWrap = styled.div`
  display: flex;
  justify-content: space-between;
`;
const ReviewBtn = styled(Text)`
  white-space: nowrap;
`;
const Underline = styled.div`
  border: 1px solid #545454;
  width: 100%;
`;
const PostedReviewContainer = styled.div`
  margin-left: 20px;
  display: flex;
  justify-content: center;
  flex-direction: column;
`;
const PostedReview = styled.div`
  display: flex;
  gap: 8px;
  justify-content: space-between;
`;
const PostedReviewInfoWrap = styled.div`
  display: flex;
  gap: 10px;
`;
const ImageWrap = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 5px;
`;
const ReviewImage = styled.img`
  width: 93px;
  height: 93px;
  object-fit: cover;
`;

export default Review;
